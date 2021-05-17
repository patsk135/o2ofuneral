import { GenID } from './decorators';
import { Model } from 'objection';
import { v4 as uuidv4 } from 'uuid';

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    bank_account: string;
    account_number: string;
    phone?: string;
    address?: string;
    is_verified: boolean;
}

@GenID(uuidv4)
export class UserModel extends Model implements User {
    id!: string;
    username!: string;
    email!: string;
    password!: string;
    firstname!: string;
    lastname!: string;
    bank_account!: string;
    account_number!: string;
    phone?: string;
    address?: string;
    is_verified!: boolean;
    static tableName = 'user';
}
