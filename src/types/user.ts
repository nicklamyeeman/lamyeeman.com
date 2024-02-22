export type UserRoles = 'admin' | 'user';

export interface User {
    uid: string;
    role: UserRoles;
    email: string;
    createdAt: number;
}

export interface Users {
    [userId: string]: User;
}