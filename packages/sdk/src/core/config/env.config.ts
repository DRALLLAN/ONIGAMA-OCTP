import { LogLevel } from '../logger/log-level';
import { ConfigError } from './config.error';
import type { OCTPConfig, OCTPEnvironment } from './config.interface';

const VALID_ENVIRONMENTS: readonly OCTPEnvironment[] = [
  'development',
  'test',
  'production'
];

function resolveEnv(raw: string | undefined): OCTPEnvironment {
  if (!raw) {
    return 'development';
  }

  if (!VALID_ENVIRONMENTS.includes(raw as OCTPEnvironment)) {
    throw new ConfigError(
      `Invalid NODE_ENV '${raw}'. Expected one of: ${VALID_ENVIRONMENTS.join(', ')}`
    );
  }

  return raw as OCTPEnvironment;
}

function resolveLogLevel(raw: string | undefined): LogLevel {
  if (!raw) {
    return LogLevel.INFO;
  }

  const upper = raw.toUpperCase();

  if (!(upper in LogLevel)) {
    throw new ConfigError(
      `Invalid LOG_LEVEL '${raw}'. Expected one of: ${Object.values(LogLevel).join(', ')}`
    );
  }

  return LogLevel[upper as keyof typeof LogLevel];
}

function resolveRedisUrl(
  raw: string | undefined,
  env: OCTPEnvironment
): string {
  if (raw) {
    return raw;
  }

  if (env === 'production') {
    throw new ConfigError(
      "REDIS_URL is required when NODE_ENV='production'"
    );
  }

  return 'redis://localhost:6379';
}

/**
 * Reads OCTP configuration from environment variables.
 *
 * This is the single place environment variables should be read from —
 * modules should depend on OCTPConfig, not on process.env directly, so
 * config sourcing can later move to a file, secrets manager, etc.
 * without touching call sites.
 */
export function loadConfig(
  source: NodeJS.ProcessEnv = process.env
): OCTPConfig {
  const env = resolveEnv(source['NODE_ENV']);

  return {
    env,
    logLevel: resolveLogLevel(source['LOG_LEVEL']),
    redis: {
      url: resolveRedisUrl(source['REDIS_URL'], env)
    },
    embedding: {
      provider: source['EMBEDDING_PROVIDER'] ?? 'mock'
    }
  };
}
