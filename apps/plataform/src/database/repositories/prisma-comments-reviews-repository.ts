import prisma from '../prisma'
import { CommentReview } from '../../entities'

export class PrismaCommentsReviewRepository {
    async create (commentReview: CommentReview): Promise<void> {
        await prisma.commentReview.create({
            data: {
                userId: commentReview.userId,
                commentId: commentReview.commentId,
                hasLiked: commentReview.hasLiked
            }
        })
    }
}