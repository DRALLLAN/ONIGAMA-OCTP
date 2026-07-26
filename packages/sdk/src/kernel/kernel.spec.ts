import { Kernel } from './kernel';
import { InMemoryEventBus, OCTP_EVENTS } from '../core/events';
import type { AgentResult } from '../agent/agent.result';
import type { Tool } from '../mcp/tool.interface';

// NOTE: Kernel.executeAgent() casts the registered agent to ExecutableAgent
// and calls .run(input, context) -- not the Agent.execute(input) method.
// registerAgent()'s parameter type is Agent (execute-based), so a plain
// Agent implementation with no .run() will type-check on registration but
// throw "agent.run is not a function" at execution time. These doubles
// implement both so the test exercises the Kernel's real call path.
function createEchoAgent() {
  return {
    id: 'echo-agent',
    name: 'Echo Agent',
    async execute(input: unknown): Promise<AgentResult> {
      return { success: true, data: input };
    },
    async run(input: unknown): Promise<AgentResult> {
      return { success: true, data: input };
    }
  };
}

function createFailingAgent() {
  return {
    id: 'failing-agent',
    name: 'Failing Agent',
    async execute(): Promise<AgentResult> {
      return { success: false, error: 'agent blew up' };
    },
    async run(): Promise<AgentResult> {
      throw new Error('agent blew up');
    }
  };
}

function createEchoTool(): Tool {
  return {
    id: 'echo-tool',
    name: 'Echo Tool',
    async execute(input: unknown): Promise<unknown> {
      return input;
    }
  };
}

describe('Kernel + EventBus integration', () => {
  it('defaults to an InMemoryEventBus when none is provided', () => {
    const kernel = new Kernel();

    expect(kernel.getEventBus()).toBeInstanceOf(InMemoryEventBus);
  });

  it('uses the EventBus passed into the constructor', () => {
    const eventBus = new InMemoryEventBus();
    const kernel = new Kernel(eventBus);

    expect(kernel.getEventBus()).toBe(eventBus);
  });

  it('emits agent.registered on registerAgent', async () => {
    const kernel = new Kernel();
    const events: unknown[] = [];

    kernel.getEventBus().on(OCTP_EVENTS.AGENT_REGISTERED, (e) => {
      events.push(e.payload);
    });

    kernel.registerAgent(createEchoAgent());

    // registration events are fire-and-forget (void emit); flush microtasks
    await Promise.resolve();

    expect(events).toEqual([{ agentId: 'echo-agent' }]);
  });

  it('emits agent.executed with the result on a successful run', async () => {
    const kernel = new Kernel();
    const events: unknown[] = [];

    kernel.getEventBus().on(OCTP_EVENTS.AGENT_EXECUTED, (e) => {
      events.push(e.payload);
    });

    kernel.registerAgent(createEchoAgent());

    await kernel.executeAgent('echo-agent', { symbol: 'XAUUSD' });

    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({
      agentId: 'echo-agent',
      input: { symbol: 'XAUUSD' }
    });
  });

  it('emits agent.execution.failed and still throws when the agent errors', async () => {
    const kernel = new Kernel();
    const events: unknown[] = [];

    kernel.getEventBus().on(OCTP_EVENTS.AGENT_EXECUTION_FAILED, (e) => {
      events.push(e.payload);
    });

    kernel.registerAgent(createFailingAgent());

    await expect(
      kernel.executeAgent('failing-agent', {})
    ).rejects.toThrow('agent blew up');

    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({ agentId: 'failing-agent' });
  });

  it('emits tool.registered and tool.executed', async () => {
    const kernel = new Kernel();
    const registered: unknown[] = [];
    const executed: unknown[] = [];

    kernel.getEventBus().on(OCTP_EVENTS.TOOL_REGISTERED, (e) => {
      registered.push(e.payload);
    });
    kernel.getEventBus().on(OCTP_EVENTS.TOOL_EXECUTED, (e) => {
      executed.push(e.payload);
    });

    kernel.registerTool(createEchoTool());
    await Promise.resolve();

    await kernel.executeTool('echo-tool', { price: 2385 });

    expect(registered).toEqual([{ toolId: 'echo-tool' }]);
    expect(executed).toHaveLength(1);
    expect(executed[0]).toMatchObject({
      toolId: 'echo-tool',
      input: { price: 2385 }
    });
  });

  it('throws when registering an agent id that is already registered', () => {
    const kernel = new Kernel();

    kernel.registerAgent(createEchoAgent());

    expect(() => kernel.registerAgent(createEchoAgent())).toThrow(
      /already registered/
    );
  });

  it('throws when registering a duplicate tool id', () => {
    const kernel = new Kernel();

    kernel.registerTool(createEchoTool());

    expect(() => kernel.registerTool(createEchoTool())).toThrow(
      /already registered/
    );
  });

  it('unregisterAgent removes the agent, emits agent.unregistered, and allows re-registering', async () => {
    const kernel = new Kernel();
    const events: unknown[] = [];

    kernel.getEventBus().on(OCTP_EVENTS.AGENT_UNREGISTERED, (e) => {
      events.push(e.payload);
    });

    kernel.registerAgent(createEchoAgent());

    expect(kernel.unregisterAgent('echo-agent')).toBe(true);
    expect(kernel.getAgent('echo-agent')).toBeUndefined();

    await Promise.resolve();
    expect(events).toEqual([{ agentId: 'echo-agent' }]);

    // now that it's gone, re-registering the same id must not throw
    expect(() => kernel.registerAgent(createEchoAgent())).not.toThrow();
  });

  it('unregisterAgent returns false and does not emit for an unknown id', async () => {
    const kernel = new Kernel();
    const events: unknown[] = [];

    kernel.getEventBus().on(OCTP_EVENTS.AGENT_UNREGISTERED, (e) => {
      events.push(e.payload);
    });

    expect(kernel.unregisterAgent('does-not-exist')).toBe(false);

    await Promise.resolve();
    expect(events).toHaveLength(0);
  });
});
