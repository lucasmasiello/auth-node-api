import winston from 'winston'

// Wrap Winston logger to print reqId in each log
const formatMessage = (message: object, callId: string): string => {
  message = {
    callId,
    ...message
  }
  return JSON.stringify(message)
}

export class Logger {
  callId: string

  constructor (callId: string) {
    this.callId = callId
  }

  log (level: string, message: object): void {
    winston.log(level, formatMessage(message, this.callId))
  }

  error (message: object): void {
    winston.error(formatMessage(message, this.callId))
  }

  warn (message: object): void {
    winston.warn(formatMessage(message, this.callId))
  }

  verbose (message: object): void {
    winston.verbose(formatMessage(message, this.callId))
  }

  info (message: object): void {
    winston.info(formatMessage(message, this.callId))
  }

  debug (message: object): void {
    winston.debug(formatMessage(message, this.callId))
  }

  silly (message: object): void {
    winston.silly(formatMessage(message, this.callId))
  }
}
