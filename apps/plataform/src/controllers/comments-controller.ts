import { Controller, Middleware, Post, Delete } from '@overnightjs/core'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { CommentsService } from '../services/comments-service'
import { UsersService } from '../services/users-service'
import { roleAuthenticationMiddleware } from '../middlewares/auth-middleware'
import { ROLE_AVANCADO, ROLE_BASICO, ROLE_MODERADOR } from '../entities/types/roles'

@Controller('comments')
export class CommentsController {
    private commentService: CommentsService
    private userService: UsersService

    constructor() {
        this.commentService = new CommentsService()
        this.userService = new UsersService()
    }

    @Post()
    @Middleware(roleAuthenticationMiddleware([ROLE_BASICO, ROLE_AVANCADO, ROLE_MODERADOR]))
    public async create(request: Request, response: Response): Promise<void> {
        const { id: userId } = request.user
        const { movieId, text } = request.body
        
        await this.commentService.create({
            userId,
            movieId,
            text
        })

        response.status(StatusCodes.CREATED).end()
    }

    @Post('replies')
    @Middleware(roleAuthenticationMiddleware([ROLE_BASICO, ROLE_AVANCADO, ROLE_MODERADOR]))
    public async createReply(request: Request, response: Response): Promise<void> {
        const { id: userId } = request.user
        const { movieId, text, replyId } = request.body
        
        await this.commentService.create({
            userId,
            movieId,
            text,
            replyId
        })

        await this.userService.updatePoints(userId)

        response.status(StatusCodes.CREATED).end()
    }

    @Post('citations')
    @Middleware(roleAuthenticationMiddleware([ROLE_AVANCADO, ROLE_MODERADOR]))
    public async createCitation(request: Request, response: Response): Promise<void> {
        const { id: userId } = request.user
        const { movieId, text, citationId, replyId } = request.body
        
        await this.commentService.create({
            userId,
            movieId,
            text,
            replyId,
            citationId
        })

        response.status(StatusCodes.CREATED).end()
    }

    @Delete(':commentId')
    @Middleware(roleAuthenticationMiddleware([ROLE_MODERADOR]))
    public async delete(request: Request, response: Response): Promise<void> {
        const commentId = request.params.commentId as string

        const id = parseInt(commentId)

        await this.commentService.delete(id)

        response.status(StatusCodes.OK).end()
    }
}