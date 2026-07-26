import { OCTPError } from '../errors/octp.error';

export class ConfigError extends OCTPError {
  constructor(message: string, cause?: unknown) {
    super(message, 'CONFIG_ERROR', cause);
  }
}
