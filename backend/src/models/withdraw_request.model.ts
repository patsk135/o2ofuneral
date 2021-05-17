import { GenID } from './decorators';
import { Model } from 'objection';
import { v4 as uuidv4 } from 'uuid';

export interface WithdrawRequest {
    id: string;
    user_id: string;
    is_paid: boolean;
}

@GenID(uuidv4)
export default class WithdrawRequestModel
    extends Model
    implements WithdrawRequest
{
    id!: string;
    user_id!: string;
    is_paid!: boolean;
    static tableName = 'withdraw_request';
    static relationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'user',
            join: {
                from: 'withdraw_request.user_id',
                to: 'user.id'
            }
        }
    };
}
