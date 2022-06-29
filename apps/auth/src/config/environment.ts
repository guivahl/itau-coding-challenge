import * as dotenv from 'dotenv';
import path from 'path';

const pathName = path.join(__dirname, '../', '../', '.env')

dotenv.config({ path: pathName })

export const DATABASE_URL:string = process.env.DATABASE_URL ?? 'postgresql://docker:password@database:5432/itau_coding_challenge'
export const BCRYPT_SALT:number= process.env.BCRYPT_SALT ? Number(process.env.BCRYPT_SALT) : 10
export const PORT:number= process.env.PORT ? Number(process.env.PORT) : 3001
export const JWT_TOKEN:string= (process.env.JWT_TOKEN) ?? 'tokenHash'
export const JWT_EXPIRES_IN:string= (process.env.JWT_EXPIRES_IN) ?? '1h'

