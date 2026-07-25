import { InMemoryEventBus } from './event-bus';
import type { Logger } from '../logger/logger.interface';

function createTestLogger(): Logger & { errors: unknown[] } {
  const errors: unknown[] = [];

  return {
    errors,
    debug: () => undefined,
    info: () => undefined,
    warn: () => undefined,
    error: (message, error) => {
      errors.push({ message, error });
    }
  };
}

describe('InMemoryEventBus', () => {
  it('delivers the payload and event name to subscribers', async () => {
    const bus = new InMemoryEventBus();
    const received: unknown[] = [];

    bus.on('agent.executed', (event) => {
      received.push(event);
    });

    await bus.emit('agent.executed', { agentId: 'a1' });

    expect(received).toHaveLength(1);
    expect(received[0]).toMatchObject({
      name: 'agent.executed',
      payload: { agentId: 'a1' }
    });
  });

  it('does nothing when no handlers are registered', async () => {
    const bus = new InMemoryEventBus();

    await expect(bus.emit('nobody.listens', {})).resolves.toBeUndefined();
  });

  it('runs multiple handlers for the same event', async () => {
    const bus = new InMemoryEventBus();
    let calls = 0;

    bus.on('workflow.executed', () => {
      calls += 1;
    });
    bus.on('workflow.executed', () => {
      calls += 1;
    });

    await bus.emit('workflow.executed', {});

    expect(calls).toBe(2);
  });

  it('isolates a throwing handler: sibling handlers still run and emit resolves', async () => {
    const logger = createTestLogger();
    const bus = new InMemoryEventBus(logger);

    let siblingRan = false;

    bus.on('tool.executed', () => {
      throw new Error('boom');
    });
    bus.on('tool.executed', () => {
      siblingRan = true;
    });

    await expect(bus.emit('tool.executed', {})).resolves.toBeUndefined();

    expect(siblingRan).toBe(true);
    expect(logger.errors).toHaveLength(1);
  });

  it('stops calling a handler after off()', async () => {
    const bus = new InMemoryEventBus();
    let calls = 0;

    const handler = () => {
      calls += 1;
    };

    bus.on('agent.registered', handler);
    bus.off('agent.registered', handler);

    await bus.emit('agent.registered', {});

    expect(calls).toBe(0);
  });

  it('on() returns an unsubscribe function', async () => {
    const bus = new InMemoryEventBus();
    let calls = 0;

    const unsubscribe = bus.on('agent.registered', () => {
      calls += 1;
    });

    unsubscribe();

    await bus.emit('agent.registered', {});

    expect(calls).toBe(0);
  });

  it('once() fires exactly one time', async () => {
    const bus = new InMemoryEventBus();
    let calls = 0;

    bus.once('tool.registered', () => {
      calls += 1;
    });

    await bus.emit('tool.registered', {});
    await bus.emit('tool.registered', {});

    expect(calls).toBe(1);
  });
});
