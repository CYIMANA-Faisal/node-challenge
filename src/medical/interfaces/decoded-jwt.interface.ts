import { Role } from '../enums/role.enum';
export interface JwtPayload {
  jti?: string;
  iss?: string;
  sub?: string;
  role?: Role;
  username?: string;
  iat?: number;
  exp?: number;
}
