import prisma from '../prisma'
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
    async updatePoints (userId: string): Promise<void | null> {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!user) return null

        const newScore = user.score + 1

        const roleByNewScore = userRole(newScore)

        const role = user.role === roleByNewScore ? user.role : roleByNewScore

        await prisma.user.update({
            data: {
                score: newScore,
                role
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