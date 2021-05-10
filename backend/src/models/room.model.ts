import { GenID } from './decorators';
import { Model } from 'objection';
import { User } from './user.model';
import { v4 as uuidv4 } from 'uuid';

export interface Room {
    id: string;
    user?: User;
    user_id: string;
}
