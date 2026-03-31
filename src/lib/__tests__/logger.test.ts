import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Logger', () => {
  let logger: typeof import('../logger').logger;

  beforeEach(async () => {
    vi.resetModules();
    vi.stubEnv('NODE_ENV', 'development');
    const mod = await import('../logger');
    logger = mod.logger;
  });

  it('exports a logger instance', () => {
    expect(logger).toBeDefined();
    expect(typeof logger.debug).toBe('function');
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.warn).toBe('function');
    expect(typeof logger.error).toBe('function');
  });

  it('logs info messages', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    logger.info('test message');
    expect(consoleSpy).toHaveBeenCalled();
    const loggedMessage = consoleSpy.mock.calls[0][0];
    expect(loggedMessage).toContain('INFO');
    expect(loggedMessage).toContain('test message');
    consoleSpy.mockRestore();
  });

  it('logs warning messages', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    logger.warn('warning message');
    expect(consoleSpy).toHaveBeenCalled();
    const loggedMessage = consoleSpy.mock.calls[0][0];
    expect(loggedMessage).toContain('WARN');
    consoleSpy.mockRestore();
  });

  it('logs error messages', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    logger.error('error message');
    expect(consoleSpy).toHaveBeenCalled();
    const loggedMessage = consoleSpy.mock.calls[0][0];
    expect(loggedMessage).toContain('ERROR');
    consoleSpy.mockRestore();
  });

  it('includes context in log messages', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    logger.info('test', { key: 'value' });
    const loggedMessage = consoleSpy.mock.calls[0][0];
    expect(loggedMessage).toContain('key');
    expect(loggedMessage).toContain('value');
    consoleSpy.mockRestore();
  });

  it('logs debug in development mode', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    logger.debug('debug message');
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
