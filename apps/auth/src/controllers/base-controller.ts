import { 
    HttpError,
    HttpConflict,
    HttpInternalServerError,
    HttpBadRequest,
} from '../utils/error'
import { Prisma } from '@prisma/client'

const { 
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError
 } = Prisma

export abstract class BaseController {
    protected errorHandler(error: unknown): HttpError {
        if (error instanceof PrismaClientKnownRequestError){
            return new HttpConflict(error.message)
        }
            
        if (error instanceof PrismaClientUnknownRequestError){
            return new HttpInternalServerError(error.message)
        }
    
        if (error instanceof PrismaClientValidationError){
            return new HttpBadRequest(error.message)
        }

        if (error instanceof Error) {
            return new HttpInternalServerError(error.message)

        }

        return new HttpInternalServerError()
    }
}