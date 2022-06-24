import AuthService from './auth-service'
import { PrismaUsersRepository } from '../database/repositories/prisma-users-repository';

import { ROLE_LEITOR } from '../entities/types/roles'
import { User } from '../entities'

interface createUserInfo {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}

export class UserService {
    async create (userInfo: createUserInfo): Promise<void> {
        const INITIAL_USER_SCORE = 0
        
        const hashedPassword = await AuthService.hashPassword(userInfo.password)

        const newUser = new User({
            role: ROLE_LEITOR,
            score: INITIAL_USER_SCORE,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            password: hashedPassword   
        })

        const userRepository = new PrismaUsersRepository()

        await userRepository.create(newUser)
    }
}