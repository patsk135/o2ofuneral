import { GenID } from './decorators';
import { Model } from 'objection';
import { User } from './user.model';
import { v4 as uuidv4 } from 'uuid';

export interface VerificationToken {
    id: string;
    user?: User;
    user_id: string;
    token: string;
}

@GenID(uuidv4)
export default class VerificationTokenModel
    extends Model
    implements VerificationToken {
    id!: string;
    user?: User;
    user_id!: string;
    token!: string;
    static tableName = 'verification_token';
    static relationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'user',
            join: {
                from: 'verification_token.user_id',
                to: 'user.id'
            }
        }
    };
}
