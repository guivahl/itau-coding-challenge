import crypto from 'crypto'
import { PrismaClient } from '@prisma/client'
import { AuthService } from '../src/services/auth-service'
import { ROLE_AVANCADO, ROLE_MODERADOR, ROLE_LEITOR, ROLE_BASICO } from '../src/entities/types/roles'

const prisma = new PrismaClient({})

async function main() {
  const password = 'senha123'
  const hashedPassword = await AuthService.hashPassword(password)

  const userLeitor = await prisma.user.upsert({
    where: { email: 'vahl-leitor@gmail.com' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      email: 'vahl-leitor@gmail.com',
      firstName: 'Guilherme',
      lastName: 'Vahl',
      role: ROLE_LEITOR,
      password: hashedPassword,
      score: 0
    },
  })


  const userBasico = await prisma.user.upsert({
    where: { email: 'vahl-basico@gmail.com' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      email: 'vahl-basico@gmail.com',
      firstName: 'Guilherme',
      lastName: 'Vahl',
      role: ROLE_BASICO,
      password: hashedPassword,
      score: 20
    },
  })


  const userAvancado = await prisma.user.upsert({
    where: { email: 'vahl-avancado@gmail.com' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      email: 'vahl-avancado@gmail.com',
      firstName: 'Guilherme',
      lastName: 'Vahl',
      role: ROLE_AVANCADO,
      password: hashedPassword,
      score: 100
    },
  })


  const userModerador = await prisma.user.upsert({
    where: { email: 'vahl-moderador@gmail.com' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      email: 'vahl-moderador@gmail.com',
      firstName: 'Guilherme',
      lastName: 'Vahl',
      role: ROLE_MODERADOR,
      password: hashedPassword,
      score: 1000
    },
  })

  console.log('Seeds de usuário criadas!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })