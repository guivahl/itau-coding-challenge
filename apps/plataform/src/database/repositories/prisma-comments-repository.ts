import prisma from '../prisma'
import { Comment } from '../../entities'

export class PrismaCommentsRepository {
    async findCommentsByUser (userId: string): Promise<Comment[]> {
        const rawComments = await prisma.comment.findMany({
            where: { userId }
        })
        
        const comments = rawComments.map((rawComment) => new Comment(rawComment))

        return comments
    }

    async findCommentsByMovie (movieId: string): Promise<Comment[]> {
        const rawComments = await prisma.comment.findMany({
            where: { movieId }
        })
        
        const comments = rawComments.map((rawComment) => new Comment(rawComment))

        return comments
    }

    async create (comment: Comment): Promise<void> {
        await prisma.comment.create({
            data: {
                userId: comment.userId,
                movieId: comment.movieId,
                citationId: comment.citationId,
                replyId: comment.replyId,
                text: comment.text,
                isRepeated: false
            }
        })
    }
}