import * as dotenv from 'dotenv';
import path from 'path';

const pathName = path.join(__dirname, '../', '../', '.env')

dotenv.config({ path: pathName })

export const DATABASE_URL:string = process.env.DATABASE_URL ?? ''
export const MOVIE_API_KEY:string= process.env.MOVIE_API_KEY ?? ''
export const BCRYPT_SALT:number= Number(process.env.BCRYPT_SALT) ?? 10

