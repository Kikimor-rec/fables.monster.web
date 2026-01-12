/**
 * Централизованная система логирования
 * Предотвращает использование console.log в production коде
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private isClient = typeof window !== 'undefined';

  /**
   * Форматирует сообщение для логирования
   */
  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` ${JSON.stringify(context)}` : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${contextStr}`;
  }

  /**
   * Основной метод логирования
   */
  private log(level: LogLevel, message: string, context?: LogContext) {
    // В production не показываем debug логи
    if (!this.isDevelopment && level === 'debug') {
      return;
    }

    const formattedMessage = this.formatMessage(level, message, context);

    // Логирование в консоль
    switch (level) {
      case 'error':
        console.error(formattedMessage);
        break;
      case 'warn':
        console.warn(formattedMessage);
        break;
      default:
        console.log(formattedMessage);
    }

    // В production можно интегрировать с внешними сервисами
    if (process.env.NODE_ENV === 'production' && level === 'error') {
      // Пример: отправка в Sentry
      // if (this.isClient && typeof Sentry !== 'undefined') {
      //   Sentry.captureException(new Error(message), { extra: context });
      // }
    }
  }

  /**
   * Debug - только в development
   */
  debug(message: string, context?: LogContext) {
    this.log('debug', message, context);
  }

  /**
   * Info - информационные сообщения
   */
  info(message: string, context?: LogContext) {
    this.log('info', message, context);
  }

  /**
   * Warning - предупреждения
   */
  warn(message: string, context?: LogContext) {
    this.log('warn', message, context);
  }

  /**
   * Error - ошибки
   */
  error(message: string, context?: LogContext) {
    this.log('error', message, context);
  }

  /**
   * Логирование ошибки с полным stack trace
   */
  exception(error: Error | unknown, context?: LogContext) {
    if (error instanceof Error) {
      this.error(error.message, {
        ...context,
        stack: error.stack,
        name: error.name,
      });
    } else {
      this.error('Unknown error', {
        ...context,
        error: String(error),
      });
    }
  }
}

export const logger = new Logger();
