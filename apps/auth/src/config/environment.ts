import * as dotenv from 'dotenv';
import path from 'path';

const pathName = path.join(__dirname, '../', '../', '.env')

dotenv.config({ path: pathName })

export const DATABASE_URL:string = process.env.DATABASE_URL ?? ''
export const BCRYPT_SALT:number= Number(process.env.BCRYPT_SALT) ?? 10
export const PORT:number= Number(process.env.PORT) ?? 3001

