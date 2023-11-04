export enum UserType {
    SUPERADMIN = 'SUPERADMIN',
    VENDOR = 'VENDOR',
}

export interface AuthPayload {
    token: string;
    user: User;
}

export interface User {
    id: number;
    email: string;
    type: UserType;
    createdAt: Date;
  }
  