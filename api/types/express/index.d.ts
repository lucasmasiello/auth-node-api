declare interface IUser{
  email: string
  name: string
  password: string
  verifiedAt: Date
  matchesPassword: (password: string) => Promise<boolean>
  verificationUrl: () => string
}

declare interface ILogger{
  error: () => any
  info: () => any
}

declare interface IContext{
  id?: string
  logger?: ILogger
  user?: IUser
}

declare namespace Express {
  interface Request {
    context: IContext
  }
}