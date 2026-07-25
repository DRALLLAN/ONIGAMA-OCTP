import { buildOCTPContainer } from './container.factory';
import { TOKENS } from '../core/container';
import { Kernel } from '../kernel';
import { OCTPPlanner } from '../planner';
import { InMemoryEventBus } from '../core/events';
import { LogLevel } from '../core/logger';

describe('buildOCTPContainer', () => {
  it('registers CONFIG, LOGGER, EVENT_BUS, KERNEL, and PLANNER', () => {
    const container = buildOCTPContainer();

    expect(container.has(TOKENS.CONFIG)).toBe(true);
    expect(container.has(TOKENS.LOGGER)).toBe(true);
    expect(container.has(TOKENS.EVENT_BUS)).toBe(true);
    expect(container.has(TOKENS.KERNEL)).toBe(true);
    expect(container.has(TOKENS.PLANNER)).toBe(true);
  });

  it('wires the Kernel to the same EventBus instance registered in the container', () => {
    const container = buildOCTPContainer();

    const kernel = container.resolve<Kernel>(TOKENS.KERNEL);
    const eventBus = container.resolve<InMemoryEventBus>(TOKENS.EVENT_BUS);

    expect(kernel.getEventBus()).toBe(eventBus);
  });

  it('resolves a real Kernel and a real OCTPPlanner', () => {
    const container = buildOCTPContainer();

    expect(container.resolve<Kernel>(TOKENS.KERNEL)).toBeInstanceOf(Kernel);
    expect(
      container.resolve<OCTPPlanner>(TOKENS.PLANNER)
    ).toBeInstanceOf(OCTPPlanner);
  });

  it('accepts a pre-loaded config instead of reading process.env itself', () => {
    const container = buildOCTPContainer({
      env: 'test',
      logLevel: LogLevel.INFO,
      redis: { url: 'redis://custom:6379' },
      embedding: { provider: 'mock' }
    });

    expect(container.resolve(TOKENS.CONFIG)).toMatchObject({
      env: 'test',
      redis: { url: 'redis://custom:6379' }
    });
  });
});
