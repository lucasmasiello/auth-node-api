import { UserDocument } from "./schemas/user"

export class Context {
  user: UserDocument | undefined
  logger: any
  id: string

  constructor(id: string, logger: any){
    this.id = id
    this.logger = logger
  }
}


