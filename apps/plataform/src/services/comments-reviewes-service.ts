import { PrismaCommentsReviewRepository } from '../database/repositories/prisma-comments-reviewes-repository';

import { CommentReview } from '../entities'

interface createCommentReviewInfo {
    userId: string
    commentId: number
    hasLiked: boolean
}

export class CommentsReviewService {
    private commentRepository: PrismaCommentsReviewRepository

    constructor() {
        this.commentRepository = new PrismaCommentsReviewRepository()
    }

    async create(commentInfo: createCommentReviewInfo): Promise<void> {
        const newCommentReview = new CommentReview({
            userId: commentInfo.userId,
            commentId: commentInfo.commentId,
            hasLiked: commentInfo.hasLiked
        })

        await this.commentRepository.create(newCommentReview)
    }
}