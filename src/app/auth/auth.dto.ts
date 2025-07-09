import { UserRoleDtoTs } from "../dtos/user-role.dto";

export type AuthDtoTs = {
  username: string;
  password: string;
};

export type AuthResponseDtoTs = {
  username: string;
  name: string;
  email: string;
  roles: UserRole[];
  tokens:{
    userId: number;
    accessToken: string;
    refreshToken: string;
    expiredAccessToken: string;
    expiredRefreshToken: string;
  }
};

export const Roles = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
};

export type UserRole = 'admin' | 'sales' | 'manager';

export interface User {
  id: number;
  name: string;
  email: string;
  roles: UserRoleDtoTs[];
}
