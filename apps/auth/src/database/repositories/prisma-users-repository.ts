import prisma from '../prisma'
import { User } from '../../entities'

export class PrismaUsersRepository {
    async getUserByEmail (email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email }
        })
        
        if (!user) return null

        return new User(user)
    }

}