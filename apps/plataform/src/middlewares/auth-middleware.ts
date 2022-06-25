import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

export function authMiddleware(request: Request, response: Response, next: NextFunction): void {
    try {
        request.user = { id: 'token' }
        next()
    } catch (err) {
        response.status(StatusCodes.UNAUTHORIZED).end()
    }
}