export interface OCTPEvent<TPayload = unknown> {
  readonly name: string;
  readonly payload: TPayload;
  readonly timestamp: Date;
}

export type EventHandler<TPayload = unknown> = (
  event: OCTPEvent<TPayload>
) => void | Promise<void>;

export type Unsubscribe = () => void;

export interface IEventBus {
  /**
   * Subscribe to an event. Returns an unsubscribe function.
   */
  on<TPayload = unknown>(
    eventName: string,
    handler: EventHandler<TPayload>
  ): Unsubscribe;

  /**
   * Subscribe to an event for a single occurrence only.
   */
  once<TPayload = unknown>(
    eventName: string,
    handler: EventHandler<TPayload>
  ): Unsubscribe;

  /**
   * Remove a previously registered handler.
   */
  off(eventName: string, handler: EventHandler): void;

  /**
   * Emit an event. Handlers run independently — one handler throwing
   * never prevents the others from running, and never rejects this call.
   * Handler failures are reported through the injected Logger as an
   * EventBusError.
   */
  emit<TPayload = unknown>(
    eventName: string,
    payload: TPayload
  ): Promise<void>;
}
