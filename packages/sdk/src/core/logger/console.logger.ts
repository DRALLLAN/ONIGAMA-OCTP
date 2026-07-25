import { Logger } from "./logger.interface";
import { LogLevel } from "./log-level";

export class ConsoleLogger
implements Logger {

  private write(
    level: LogLevel,
    message: string,
    metadata?: unknown
  ) {

    const timestamp =
      new Date().toISOString();

    console.log(
      `[${timestamp}] [${level}] ${message}`,
      metadata ?? ""
    );

  }

  debug(message: string, metadata?: unknown): void {

    this.write(
      LogLevel.DEBUG,
      message,
      metadata
    );

  }

  info(message: string, metadata?: unknown): void {

    this.write(
      LogLevel.INFO,
      message,
      metadata
    );

  }

  warn(message: string, metadata?: unknown): void {

    this.write(
      LogLevel.WARN,
      message,
      metadata
    );

  }

  error(
    message: string,
    error?: unknown,
    metadata?: unknown
  ): void {

    this.write(
      LogLevel.ERROR,
      message,
      {
        error,
        metadata
      }
    );

  }

}
