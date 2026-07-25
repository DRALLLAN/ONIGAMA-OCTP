import { EventBusError } from '../errors/event.error';
import type { Logger } from '../logger/logger.interface';
import type {
  EventHandler,
  IEventBus,
  OCTPEvent,
  Unsubscribe
} from './event.interface';

/**
 * In-process pub/sub implementation of IEventBus.
 *
 * This is the default cross-module communication mechanism referenced
 * in the architecture docs: modules should not import one another
 * directly for side-effecting notifications — they emit/subscribe
 * through the Kernel's EventBus instead.
 *
 * A distributed implementation (Redis pub/sub, etc.) can implement
 * the same IEventBus interface later without changing call sites.
 */
export class InMemoryEventBus implements IEventBus {
  private handlers = new Map<string, Set<EventHandler>>();

  constructor(private readonly logger?: Logger) {}

  on<TPayload = unknown>(
    eventName: string,
    handler: EventHandler<TPayload>
  ): Unsubscribe {
    const set = this.handlers.get(eventName) ?? new Set<EventHandler>();

    set.add(handler as EventHandler);
    this.handlers.set(eventName, set);

    return () => this.off(eventName, handler as EventHandler);
  }

  once<TPayload = unknown>(
    eventName: string,
    handler: EventHandler<TPayload>
  ): Unsubscribe {
    const wrapped: EventHandler<TPayload> = async (event) => {
      this.off(eventName, wrapped as EventHandler);
      await handler(event);
    };

    return this.on(eventName, wrapped);
  }

  off(eventName: string, handler: EventHandler): void {
    this.handlers.get(eventName)?.delete(handler);
  }

  async emit<TPayload = unknown>(
    eventName: string,
    payload: TPayload
  ): Promise<void> {
    const set = this.handlers.get(eventName);

    if (!set || set.size === 0) {
      return;
    }

    const event: OCTPEvent<TPayload> = {
      name: eventName,
      payload,
      timestamp: new Date()
    };

    await Promise.all(
      Array.from(set).map((handler) => this.runHandler(handler, event))
    );
  }

  private async runHandler(
    handler: EventHandler,
    event: OCTPEvent
  ): Promise<void> {
    try {
      await handler(event);
    } catch (cause) {
      const error = new EventBusError(event.name, cause);

      // A handler failing must never crash the emitter or block
      // sibling handlers — it is only ever logged.
      this.logger?.error(error.message, error);
    }
  }
}
