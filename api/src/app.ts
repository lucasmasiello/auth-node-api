import express, { Response, NextFunction, Request } from 'express'
import session, { Store } from 'express-session'
import { SESSION_OPTIONS } from './config'
import { register, login, home } from './routes'
import { notFound, serverError, catchAsync, active } from './middlewares'

export const createApp = (store: Store) => {
  const app = express()
  app.use(express.json())

  app.use(
    session({
      ...SESSION_OPTIONS,
      store
    })
  )

  // all the request must be pass the "active" middleware
  // app.use(catchAsync(active))

  // Routes
  app.use(login)
  app.use(register)
  app.use(home)

  // Handle Errors
  app.use(notFound)
  app.use(serverError)

  return app
}