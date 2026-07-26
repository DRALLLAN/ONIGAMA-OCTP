import type { LogLevel } from '../logger/log-level';

export type OCTPEnvironment = 'development' | 'test' | 'production';

export interface OCTPConfig {
  readonly env: OCTPEnvironment;
  readonly logLevel: LogLevel;

  readonly redis: {
    readonly url: string;
  };

  readonly embedding: {
    readonly provider: string;
  };
}
