import { PrismaUsersRepository } from '../database/repositories/prisma-users-repository';

import { User } from '../entities'

export class UsersService {
    private userRepository: PrismaUsersRepository

    constructor() {
        this.userRepository = new PrismaUsersRepository()
    }

    async getUserByEmail (email: string): Promise<User | null> {
        const user = await this.userRepository.getUserByEmail(email)

        return user
    }
}