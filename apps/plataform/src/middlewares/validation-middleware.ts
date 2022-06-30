import { Schema, ValidationOptions } from 'joi'
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

import { Validator, FieldOptions } from '../utils/validator'
import { HttpBadRequest } from '../utils/error'

export const validationMiddleware = (object: FieldOptions) => {
    const errors: Array<string> = []

    return (request: Request, response: Response, next: NextFunction) => {
        const { body, headers, query } = request

        const validator = new Validator(object, {
            body, 
            headers, 
            query
        })

        validator.validateAllObjects()

        if (validator.hasErrors()) {
            const errorMessage = validator.getErrorMessage()
            
            return next(new HttpBadRequest(errorMessage))
        }

        next()
    }
}