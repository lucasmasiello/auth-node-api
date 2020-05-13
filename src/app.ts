import express from 'express'
import { middleware } from 'express-http-context'
import { v1 } from 'uuid'
import { register, login, home, verify, reset } from './routes'
import { notFound, serverError } from './middlewares'
import { Context } from './models/context'
import { Logger } from './helpers'

export const createApp = () => {
  const app = express()
  app.use(express.json())
  app.use(middleware)

  // all the request must be pass the "active" middleware
  // app.use(catchAsync(active))

  // set context variables on the request
  app.use((req, res, next) => {
    const context = new Context(v1(), new Logger(v1()))

    req.context = context
    next()
  })

  // Routes
  app.use(login)
  app.use(register)
  app.use(home)
  app.use(verify)
  app.use(reset)

  // Handle Errors
  app.use(notFound)
  app.use(serverError)

  return app
}
