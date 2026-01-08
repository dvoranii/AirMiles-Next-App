/**
 * Cross-Cutting Concern: Logging Service
 *
 * Centralized logging utility with consistent formatting
 * In production, this would integrate with services like DataDog, Sentry, etc.
 */

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";

  /**
   * Format log message with timestamp and context
   */
  private format(
    level: LogLevel,
    message: string,
    context?: LogContext
  ): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` | ${JSON.stringify(context)}` : "";
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  /**
   * Log info message
   */
  info(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.log(this.format("info", message, context));
    }
    // In production: send to logging service
  }

  /**
   * Log warning message
   */
  warn(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.warn(this.format("warn", message, context));
    }
    // In production: send to logging service
  }

  /**
   * Log error message
   */
  error(message: string, context?: LogContext): void {
    console.error(this.format("error", message, context));
    // In production: send to error tracking service (Sentry, DataDog)
  }

  /**
   * Log debug message (dev only)
   */
  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.debug(this.format("debug", message, context));
    }
  }
}

export const logger = new Logger();
