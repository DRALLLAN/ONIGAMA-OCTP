import { OCTPRuntime } from './octp.runtime';
import { buildOCTPContainer } from './container.factory';
import { TOKENS } from '../core/container';
import { Kernel } from '../kernel';

describe('OCTPRuntime + ServiceContainer wiring', () => {
  it('builds a default container when none is provided', () => {
    const runtime = new OCTPRuntime();

    expect(runtime.getContainer()).toBeDefined();
    expect(runtime.kernel).toBeInstanceOf(Kernel);
  });

  it('uses the exact Kernel instance resolved from an injected container', () => {
    const container = buildOCTPContainer();
    const expectedKernel = container.resolve<Kernel>(TOKENS.KERNEL);

    const runtime = new OCTPRuntime(container);

    expect(runtime.kernel).toBe(expectedKernel);
    expect(runtime.getContainer()).toBe(container);
  });

  it('runs a full analyze-market task end to end through the injected container', async () => {
    const runtime = new OCTPRuntime(buildOCTPContainer());

    const result = await runtime.runTask({
      task: 'analyze-market',
      symbol: 'XAUUSD',
      timeframe: '15m'
    });

    expect(result).toMatchObject({ success: true });
  });
});
