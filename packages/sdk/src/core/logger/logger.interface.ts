export interface Logger {

  debug(message: string, metadata?: unknown): void;

  info(message: string, metadata?: unknown): void;

  warn(message: string, metadata?: unknown): void;

  error(
    message: string,
    error?: unknown,
    metadata?: unknown
  ): void;

}
