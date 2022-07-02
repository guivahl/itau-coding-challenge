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
  constructor(message: string = ReasonPhrases.BAD_REQUEST) {
    super(StatusCodes.BAD_REQUEST, message)
  }
}

export class HttpInternalServerError extends HttpError {
  constructor(message: string = ReasonPhrases.INTERNAL_SERVER_ERROR) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message)
  }
}

export class HttpUnauthorized extends HttpError {
  constructor(message: string = ReasonPhrases.UNAUTHORIZED) {
    super(StatusCodes.UNAUTHORIZED, message)
  }
}

export class HttpForbidden extends HttpError {
  constructor(message: string = ReasonPhrases.FORBIDDEN) {
    super(StatusCodes.FORBIDDEN, message)
  }
}
export class HttpConflict extends HttpError {
  constructor(message: string = ReasonPhrases.CONFLICT) {
    super(StatusCodes.CONFLICT, message)
  }
}
export class HttpNotFound extends HttpError {
  constructor(message: string = ReasonPhrases.NOT_FOUND) {
    super(StatusCodes.NOT_FOUND, message)
  }
}
