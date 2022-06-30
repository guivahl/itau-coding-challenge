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
    super(StatusCodes.BAD_REQUEST, message)
  }
}