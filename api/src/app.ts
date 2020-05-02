import express, { Response, NextFunction, Request } from 'express'
import session, { Store } from 'express-session'
import { SESSION_OPTIONS } from './config'
import { register } from './routes'
import { notFound, serverError } from './middlewares'

export const createApp = (store: Store) => {
  const app = express()
  app.use(express.json())

  app.use(
    session({
      ...SESSION_OPTIONS,
      store
    })
  )

  app.use(register)

  app.use(notFound)

  app.use(serverError)

  return app
}