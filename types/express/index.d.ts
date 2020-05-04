declare interface IUser{
  email: string
  name: string
  password: string
  verifiedAt: Date
  matchesPassword: (password: string) => Promise<boolean>
  verificationUrl: () => string
}

declare interface ILogger{
  error: (message: object) => void
  info: (message: object) => void
  debug: (message: object) => void
}

declare interface IContext{
  id: string
  logger: ILogger
  user?: IUser
}

declare namespace Express {
  interface Request {
    context: IContext
  }
}