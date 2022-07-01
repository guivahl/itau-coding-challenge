import { Controller, Middleware, Post } from '@overnightjs/core'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { CommentsReviewService } from '../services/comments-reviewes-service'
import { roleAuthenticationMiddleware } from '../middlewares/auth-middleware'
import { ROLE_AVANCADO, ROLE_MODERADOR } from '../entities/types/roles'
import { validationMiddleware } from '../middlewares/validation-middleware'
import { commentReviewCreateSchema } from '../entities/schemas/commentReview'
import { BaseController } from './base-controller'

@Controller('comments-reviewes')
export class CommentsReviewController extends BaseController {
    private ratingService: CommentsReviewService

    constructor() {
        super()
        this.ratingService = new CommentsReviewService()
    }

    @Post()
    @Middleware(validationMiddleware(commentReviewCreateSchema))
    @Middleware(roleAuthenticationMiddleware([ROLE_AVANCADO, ROLE_MODERADOR]))
    public async create(request: Request, response: Response): Promise<void> {
        const { id: userId } = request.user
        const { commentId, hasLiked } = request.body
        try {
            await this.ratingService.create({
                userId,
                commentId,
                hasLiked
            })
    
            response.status(StatusCodes.CREATED).end()
        } catch (error) {
            const newError = this.errorHandler(error)
            response.status(newError.status).json({ message: newError.message })
        }
    }

}