import { UserDocument } from "../schemas";

export interface IContext {
  user: UserDocument,
  logger: any,
  id: string
}

export interface IRequest {
  context: IContext
}