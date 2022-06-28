import prisma from '../prisma'
import { User } from '../../entities'
import { 
    ROLES,
    ROLE_LEITOR,
    ROLE_BASICO,
    ROLE_AVANCADO,
    ROLE_MODERADOR 
} from '../../entities/types/roles'

const userRole = (score: number): ROLES => {
    if (score >= 1000) return ROLE_MODERADOR
    if (score >= 100) return ROLE_AVANCADO
    if (score >= 20) return ROLE_BASICO
    return ROLE_LEITOR
}

export class PrismaUsersRepository {
    async create (user: User): Promise<void> {
        await prisma.user.create({
            data: {
                id: user.id,
                role: user.role,
                score: user.score,
                firstName: user.firstName, 
                lastName: user.lastName,
                email: user.email,
                password: user.password
            }
        })
    }

    async getUserById (userId: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!user) return null

        return new User(user, user.id)
    }

    async updatePoints (userId: string, newScore: number): Promise<void | null> {
        await prisma.user.update({
            data: {
                score: newScore
            },
            where: { id: userId }
        })
    }

    async updateRole (userId: string, newRole: ROLES): Promise<void> {
        await prisma.user.update({
            data: {
                role: newRole
            },
            where: { id: userId }
        })
    }

    async updateRoleModerator (userId: string): Promise<void>  {
        await prisma.user.update({
            data: {
                role: ROLE_MODERADOR
            },
            where: { id: userId }
        })
    }
}