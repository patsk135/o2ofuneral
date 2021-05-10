import { CreateUser } from '../user/user.interface';
import { User } from '../models/user.model';

export type Token = string;
export interface TokenPayload {
    userID: string;
    role: string;
}

export type RegisterInput = CreateUser;

export interface LoginInput {
    username: string;
    password: string;
}

export interface RegisterPayload {
    user: Omit<User, 'password'>;
    token: string;
}

export type LoginPayload = RegisterPayload;

export interface VerifyUserInput {
    userID: string;
    token: string;
}
