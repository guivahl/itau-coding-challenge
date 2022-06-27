import { PrismaCommentsRepository } from '../database/repositories/prisma-comments-repository';

import { Comment } from '../entities'

export class MoviesService {
    private commentRepository: PrismaCommentsRepository

    constructor() {
        this.commentRepository = new PrismaCommentsRepository()
    }

    async getCommentsByMovie (movieId: string): Promise<Comment[]> {
        const comments = await this.commentRepository.findCommentsByMovie(movieId)
        
        return comments
    }
}