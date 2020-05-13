export class HttpError extends Error {
  public status!: number
  public code!: string
  public innerError!: any

  constructor (status: number, code: string, message: string, innerError?: any) {
    super(message)
    this.status = status
    this.code = code
    this.innerError = innerError
  }
}

export class BadRequest extends HttpError {
  constructor (
    status = 400,
    code = 'BAD_REQUEST',
    message = 'bad request',
    innerError?: any
  ) {
    super(status, code, message, innerError || undefined)
  }
}

export class Unauthorized extends HttpError {
  constructor (
    status = 401,
    code = 'UNAUTHORIZED',
    message = 'Unauthorized',
    innerError?: any
  ) {
    super(status, code, message, innerError || undefined)
  }
}
