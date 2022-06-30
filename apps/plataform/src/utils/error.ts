import { ReasonPhrases, StatusCodes } from 'http-status-codes'

export class HttpError extends Error {
    public status: number
    public message: string
    
    constructor(status: number, message: string) {
      super(message)
      this.status = status ?? StatusCodes.INTERNAL_SERVER_ERROR
      this.message = message ?? ReasonPhrases.INTERNAL_SERVER_ERROR
    }
}

export class HttpBadRequest extends HttpError {
  constructor(message: string) {
    const newMessage = message ?? ReasonPhrases.BAD_REQUEST
    super(StatusCodes.BAD_REQUEST, newMessage)
  }
}

export class HttpInternalServerError extends HttpError {
  constructor(message?: string) {
    const newMessage = message ?? ReasonPhrases.INTERNAL_SERVER_ERROR
    super(StatusCodes.INTERNAL_SERVER_ERROR, newMessage)
  }
}

export class HttpUnauthorized extends HttpError {
  constructor(message?: string) {
    const newMessage = message ?? ReasonPhrases.UNAUTHORIZED
    super(StatusCodes.UNAUTHORIZED, newMessage)
  }
}

export class HttpForbidden extends HttpError {
  constructor(message?: string) {
    const newMessage = message ?? ReasonPhrases.FORBIDDEN
    super(StatusCodes.FORBIDDEN, newMessage)
  }
}