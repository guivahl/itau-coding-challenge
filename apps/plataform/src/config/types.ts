import { ROLES } from '../entities/types/roles'
interface userContext {
  id: string,
  role: ROLES
}

declare namespace Express {
    export interface Request {
      user: userContext
    }
  }