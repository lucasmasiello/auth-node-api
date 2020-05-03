import { RequestHandler, Request, Response, NextFunction } from "express";

export const catchAsync = (handler: RequestHandler) =>
  (...args: [Request, Response, NextFunction]) => handler(...args).catch(args[2])

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    errorCode: 'NOT_FOUND',
    errorMessage: 'Not Found'
  })
}

export const serverError = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (!err.status) {
    console.error(err.stack)
  }

  res.status(err.status || 500)
    // .json({ message: err.message || 'Internal Server Error' })
    .json({
      errorCode: err.code || 'BAD_GATEWAY',
      errorMessage: err.message || 'Internal Server Error',
      errorDetails: err.innerError || null
    })
}