import { OCTPError } from './octp.error';

export class EventBusError extends OCTPError {
  constructor(eventName: string, cause?: unknown) {
    super(
      `Event handler for '${eventName}' failed`,
      'EVENT_BUS_ERROR',
      cause
    );
  }
}
