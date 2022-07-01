import { Controller, Middleware, Post, Delete, Patch } from '@overnightjs/core'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { CommentsService } from '../services/comments-service'
import { UsersService } from '../services/users-service'
import { roleAuthenticationMiddleware } from '../middlewares/auth-middleware'
import { validationMiddleware } from '../middlewares/validation-middleware'
import { commentCreateSchema, commentReplyCreateSchema, commentCitationSchema, deleteCommentSchema, updateCommentRepeteadSchema } from '../entities/schemas/comment'
import { ROLE_AVANCADO, ROLE_BASICO, ROLE_MODERADOR } from '../entities/types/roles'
import { BaseController } from './base-controller'

@Controller('comments')
export class CommentsController extends BaseController {
    private commentService: CommentsService
    private userService: UsersService

    constructor() {
        super()
        this.commentService = new CommentsService()
        this.userService = new UsersService()
    }

    @Post()
    @Middleware(validationMiddleware(commentCreateSchema))
    @Middleware(roleAuthenticationMiddleware([ROLE_BASICO, ROLE_AVANCADO, ROLE_MODERADOR]))
    public async create(request: Request, response: Response): Promise<void> {
        const { id: userId } = request.user
        const { movieId, text } = request.body
        
        try {
            await this.commentService.create({
                userId,
                movieId,
                text
            })
    
            response.status(StatusCodes.CREATED).end()
        } catch (error) {
            const newError = this.errorHandler(error)

            response.status(newError.status).json({ message: newError.message })
        }
    }

    @Post('replies')
    @Middleware(validationMiddleware(commentReplyCreateSchema))
    @Middleware(roleAuthenticationMiddleware([ROLE_BASICO, ROLE_AVANCADO, ROLE_MODERADOR]))
    public async createReply(request: Request, response: Response): Promise<void> {
        const { id: userId } = request.user
        const { movieId, text, replyId } = request.body
        
        try {
            await this.commentService.create({
                userId,
                movieId,
                text,
                replyId
            })
    
            await this.userService.updatePoints(userId)
    
            response.status(StatusCodes.CREATED).end()
        } catch (error) {
            const newError = this.errorHandler(error)

            response.status(newError.status).json({ message: newError.message })
        }
        
    }

    @Post('citations')
    @Middleware(validationMiddleware(commentCitationSchema))
    @Middleware(roleAuthenticationMiddleware([ROLE_AVANCADO, ROLE_MODERADOR]))
    public async createCitation(request: Request, response: Response): Promise<void> {
        const { id: userId } = request.user
        const { movieId, text, citationId, replyId } = request.body
        
        try {
            await this.commentService.create({
                userId,
                movieId,
                text,
                replyId,
                citationId
            })
    
            response.status(StatusCodes.CREATED).end()
        } catch (error) {
            const newError = this.errorHandler(error)

            response.status(newError.status).json({ message: newError.message })
        }
    }

    @Delete(':commentId')
    @Middleware(validationMiddleware(deleteCommentSchema))
    @Middleware(roleAuthenticationMiddleware([ROLE_MODERADOR]))
    public async delete(request: Request, response: Response): Promise<void> {
        const commentId = request.params.commentId as string

        const id = parseInt(commentId)
        try {
            await this.commentService.delete(id)
    
            response.status(StatusCodes.OK).end()
        } catch (error) {
            const newError = this.errorHandler(error)

            response.status(newError.status).json({ message: newError.message })
        }
    }

    @Patch(':commentId/repeated')
    @Middleware(validationMiddleware(updateCommentRepeteadSchema))
    @Middleware(roleAuthenticationMiddleware([ROLE_MODERADOR]))
    public async markAsRepeated(request: Request, response: Response): Promise<void> {
        const commentId = request.params.commentId as string

        const id = parseInt(commentId)

        try {
            await this.commentService.updateCommentAsRepeated(id)
    
            response.status(StatusCodes.OK).end()
        } catch (error) {
            const newError = this.errorHandler(error)

            response.status(newError.status).json({ message: newError.message })
        }
    }
}