type LogLevel = "info" | "warn" | "error" | "debug";

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";

  private format(
    level: LogLevel,
    message: string,
    context?: LogContext
  ): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` | ${JSON.stringify(context)}` : "";
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  info(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.log(this.format("info", message, context));
    }
    // In production: send to logging service
  }

  warn(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.warn(this.format("warn", message, context));
    }
    // In production: send to logging service
  }

  error(message: string, context?: LogContext): void {
    console.error(this.format("error", message, context));
    // In production: send to error tracking service (Sentry, DataDog)
  }

  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.debug(this.format("debug", message, context));
    }
  }
}

export const logger = new Logger();
