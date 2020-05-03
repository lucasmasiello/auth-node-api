import { UserDocument } from "./schemas/user"

export class Context {
  user: UserDocument | undefined
  logger: any
  id: string | undefined
}


