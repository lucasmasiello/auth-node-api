import express, { Response, NextFunction, Request } from 'express'
import session, { Store } from 'express-session'
import { SESSION_OPTIONS } from './config'
import { register, login } from './routes'
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

  // Routes
  app.use(login)
  app.use(register)

  // Handle Errors
  app.use(notFound)
  app.use(serverError)

  return app
}