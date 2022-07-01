import { Request, Response, NextFunction } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { HttpError } from '../utils/error'

export function globalErrorHandlerMiddleware(
  error: HttpError,
  _: Request,
  res: Response,
  __: NextFunction
): void {
  const status = error.status ?? StatusCodes.INTERNAL_SERVER_ERROR
  const message = error.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR
  
  const newError = new HttpError(status, message)

  res.status(newError.status).json({ code: newError.status, message: newError.message })
}