import { AuthService } from './auth-service'
import { PrismaUsersRepository } from '../database/repositories/prisma-users-repository';

import { ROLES, ROLE_LEITOR, ROLE_MODERADOR, ROLE_AVANCADO, ROLE_BASICO } from '../entities/types/roles'
import { User } from '../entities'

interface createUserInfo {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}

export class UsersService {
    private userRepository: PrismaUsersRepository

    constructor() {
        this.userRepository = new PrismaUsersRepository()
    }

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
        
        await this.userRepository.create(newUser)
    }

    async updatePoints (userId: string): Promise<void | null> {
        const user = await this.userRepository.getUserById(userId)

        if (!user) return null

        const newScore = user.score + 1

        const roleByNewScore = this.userRole(newScore)

        await this.userRepository.updatePoints(userId, newScore)

        const hasRoleChanged = user.role === roleByNewScore

        if (hasRoleChanged) {
            await this.userRepository.updateRole(userId, roleByNewScore)
        }
    }   

    async updateRoleToModerador(userId: string): Promise<void> {
        await this.userRepository.updateRole(userId, ROLE_MODERADOR)
    }

    private userRole (score: number): ROLES {
        if (score >= 1000) return ROLE_MODERADOR
        if (score >= 100) return ROLE_AVANCADO
        if (score >= 20) return ROLE_BASICO
        return ROLE_LEITOR
    }
}