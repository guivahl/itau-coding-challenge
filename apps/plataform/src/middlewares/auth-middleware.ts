import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

import { AuthService } from '../services/auth-service'
import { asyncHandler } from './async-handler-middleware'

export const authMiddleware = asyncHandler(authentication) 


async function authentication(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        const authHeader = request.headers?.authorization as string

        const [_, token] = authHeader.split(' ')

        const authService = new AuthService()

        const userInfo = await authService.verify(token)
        
        request.user = userInfo.user

        next()
    } catch (err) {
        response.status(StatusCodes.UNAUTHORIZED).end()
    }
}