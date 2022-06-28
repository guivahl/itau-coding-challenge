import { PrismaCommentsRepository } from '../database/repositories/prisma-comments-repository';

import { Comment } from '../entities'

interface createCommentInfo {
    userId: string
    movieId: string
    text: string
    citationId?: number
    replyId?: number
}

export class CommentsService {
    private commentRepository: PrismaCommentsRepository

    constructor() {
        this.commentRepository = new PrismaCommentsRepository()
    }

    async create(commentInfo: createCommentInfo): Promise<void> {
        const newComment = new Comment({
            userId: commentInfo.userId,
            movieId: commentInfo.movieId,
            text: commentInfo.text,
            citationId: commentInfo.citationId ?? null,
            replyId: commentInfo.replyId ?? null
        })

        await this.commentRepository.create(newComment)
    }

    async delete (commentId: number): Promise<void> {
        await this.commentRepository.delete(commentId)
    }

    async updateCommentAsRepeated (commentId: number): Promise<void> {
        await this.commentRepository.updateCommentAsRepeated(commentId)
    }
}