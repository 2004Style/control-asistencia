import { ROLES } from './roles.class';

export type AuthDtoTs = {
  username: string;
  password: string;
};

export type AuthResponseDtoTs = {
  idUser: number;
  username: string;
  enabled: boolean;
  roles: UserRole[];
  person: {
    idPerson: number;
    dni: string;
    firstName: string;
    lastName: string;
    birthdate: string;
    gender: string;
    address: string;
    phone: string;
    email: string;
  };
  tokens: {
    userId: number;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiry: string;
    refreshTokenExpiry: string;
  };
};

type RolesObject = typeof ROLES;
export type UserRole = RolesObject[keyof RolesObject];

export interface User {
  id: number;
  name: string;
  email: string;
  roles: UserRole[];
}

export interface RegisterUser {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  dni: string;
  birthdate: Date;
  gender: string;
  address: string;
  phone: string;
  roleName: string;
}
