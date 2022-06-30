import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

import { AuthService } from '../services/auth-service'
import { asyncHandler } from './async-handler-middleware'
import { HttpUnauthorized, HttpForbidden } from '../utils/error'
import { ROLES } from '../entities/types/roles'

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
        const newError = new HttpUnauthorized()    
        response.status(newError.status).json({ message: newError.message })
    }
}

export const roleAuthenticationMiddleware = (rolesAllowed: ROLES[]) => (request: Request, response: Response, next: NextFunction) => {
    try {
        authMiddleware(request, response, () => {
            const hasPermission = rolesAllowed.includes(request.user.role)

            if (!hasPermission) {
                response.status(StatusCodes.FORBIDDEN).end()

                return
            }

            next()
        })

    } catch (err) {
        const newError = new HttpForbidden()    
        response.status(newError.status).json({ message: newError.message })
    }

}
