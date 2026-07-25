import { loadConfig } from './env.config';
import { ConfigError } from './config.error';
import { LogLevel } from '../logger/log-level';

describe('loadConfig', () => {
  it('falls back to development defaults when nothing is set', () => {
    const config = loadConfig({});

    expect(config.env).toBe('development');
    expect(config.logLevel).toBe(LogLevel.INFO);
    expect(config.redis.url).toBe('redis://localhost:6379');
    expect(config.embedding.provider).toBe('mock');
  });

  it('reads values from the provided env source', () => {
    const config = loadConfig({
      NODE_ENV: 'test',
      LOG_LEVEL: 'debug',
      REDIS_URL: 'redis://cache:6379',
      EMBEDDING_PROVIDER: 'openai'
    });

    expect(config).toEqual({
      env: 'test',
      logLevel: LogLevel.DEBUG,
      redis: { url: 'redis://cache:6379' },
      embedding: { provider: 'openai' }
    });
  });

  it('throws ConfigError for an unknown NODE_ENV', () => {
    expect(() => loadConfig({ NODE_ENV: 'staging' })).toThrow(ConfigError);
  });

  it('throws ConfigError for an unknown LOG_LEVEL', () => {
    expect(() => loadConfig({ LOG_LEVEL: 'verbose' })).toThrow(ConfigError);
  });

  it('requires REDIS_URL to be set explicitly in production', () => {
    expect(() => loadConfig({ NODE_ENV: 'production' })).toThrow(
      ConfigError
    );

    expect(() =>
      loadConfig({
        NODE_ENV: 'production',
        REDIS_URL: 'redis://prod-cache:6379'
      })
    ).not.toThrow();
  });
});
