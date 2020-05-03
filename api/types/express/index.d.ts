interface UserDocument extends Document {
  email: string
  name: string
  password: string
  verifiedAt: Date
  matchesPassword: (password: string) => Promise<boolean>
  verificationUrl: () => string
}

declare class Context {
  user: UserDocument
  logger: any
  id: string
}

declare namespace Express {
  interface Request {
    context: Context
    boo?: string;
  }
}