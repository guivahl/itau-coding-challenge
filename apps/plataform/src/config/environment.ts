import * as dotenv from 'dotenv';
import path from 'path';

const pathName = path.join(__dirname, '../', '../', '.env')

dotenv.config({ path: pathName })

export const DATABASE_URL:string = process.env.DATABASE_URL ?? 'postgresql://docker:password@localhost:5432/itau_coding_challenge'
export const MOVIE_API_KEY:string= process.env.MOVIE_API_KEY ?? ''
export const BCRYPT_SALT:number= process.env.BCRYPT_SALT ? Number(process.env.BCRYPT_SALT) : 10
export const PORT:number= process.env.PORT ? Number(process.env.PORT) : 3000
export const URL_AUTH_API:string= process.env.URL_AUTH_API ?? 'http://auth:3001'

