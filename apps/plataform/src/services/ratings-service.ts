import { PrismaRatingsRepository } from '../database/repositories/prisma-ratings-repository';
import { UsersService } from '../services/users-service'

import { Rating } from '../entities'

interface createRatingInfo {
    userId: string
    movieId: string
    score: string
}

export class RatingsService {
    private ratingRepository: PrismaRatingsRepository
    private userService: UsersService

    constructor() {
        this.ratingRepository = new PrismaRatingsRepository()
        this.userService = new UsersService()
    }

    async create (ratingInfo: createRatingInfo): Promise<void> {
        const newRating = new Rating({
            userId: ratingInfo.userId,
            movieId: ratingInfo.movieId,
            score: ratingInfo.score
        })
        
        await this.ratingRepository.create(newRating)
        await this.userService.updatePoints(ratingInfo.userId)
    }
}