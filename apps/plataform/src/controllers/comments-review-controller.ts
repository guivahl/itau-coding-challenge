import { Controller, Middleware, Post } from '@overnightjs/core'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { CommentsReviewService } from '../services/comments-reviewes-service'
import { roleAuthenticationMiddleware } from '../middlewares/auth-middleware'
import { ROLE_AVANCADO, ROLE_MODERADOR } from '../entities/types/roles'

@Controller('comments-reviewes')
export class CommentsReviewController {
    private ratingService: CommentsReviewService

    constructor() {
        this.ratingService = new CommentsReviewService()
    }

    @Post()
    @Middleware(roleAuthenticationMiddleware([ROLE_AVANCADO, ROLE_MODERADOR]))
    public async create(request: Request, response: Response): Promise<void> {
        const { id: userId } = request.user
        const { commentId, score, hasLiked } = request.body
        
        await this.ratingService.create({
            userId,
            commentId,
            hasLiked
        })

        response.status(StatusCodes.CREATED).end()
    }

}