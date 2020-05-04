import express  from 'express'
import { register, login, home, verify } from './routes'
import { notFound, serverError } from './middlewares'
import { Context } from './models/context'
import { runInNewContext } from 'vm'

export const createApp = () => {
  const app = express()
  app.use(express.json())

  // all the request must be pass the "active" middleware
  // app.use(catchAsync(active))

  app.use((req, res, next) => {
    const context = new Context()
    context.id = new Date().toString()
    

    req.context = context
    next()
  })

  // Routes
  app.use(login)
  app.use(register)
  app.use(home)
  app.use(verify)

  // Handle Errors
  app.use(notFound)
  app.use(serverError)

  return app
}