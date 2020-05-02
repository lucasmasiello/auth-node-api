abstract class HttpError extends Error {
  public status!: number
  public code!: string
}

export class BadRequest extends HttpError {
  constructor(code = 'BAD_REQUEST', message = 'bad request'){
    super(message)

    this.status = 400
    this.code = code
  }
}

export class Unauthorized extends HttpError {
  constructor(code = 'UNAUTHORIZED', message = 'Unauthorized'){
    super(message)

    this.status = 401
    this.code = code
  }
}