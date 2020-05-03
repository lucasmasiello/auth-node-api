abstract class HttpError extends Error {
  public status!: number
  public code!: string
  public innerError!: any
}

export class BadRequest extends HttpError {
  constructor(code = 'BAD_REQUEST', message = 'bad request', innerError?: any){
    super(message)

    this.status = 400
    this.code = code
    this.innerError = innerError
  }
}

export class Unauthorized extends HttpError {
  constructor(code = 'UNAUTHORIZED', message = 'Unauthorized'){
    super(message)

    this.status = 401
    this.code = code
  }
}