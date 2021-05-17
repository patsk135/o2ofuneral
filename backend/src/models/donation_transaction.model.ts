import { GenID } from './decorators';
import { Model } from 'objection';
import { User } from './user.model';
import { v4 as uuidv4 } from 'uuid';

export interface DonationTransaction {
    id: string;
    reference: string;
    user?: User;
    user_id: string;
    donator: string;
    condolence_word: string;
    amount: number;
    status: boolean;
}

@GenID(uuidv4)
export default class DonationTransactionModel
    extends Model
    implements DonationTransaction
{
    id!: string;
    reference!: string;
    user?: User;
    user_id!: string;
    donator!: string;
    condolence_word!: string;
    amount!: number;
    status!: boolean;
    static tableName = 'donation_transaction';
    static relationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'user',
            join: {
                from: 'donation_transaction.user_id',
                to: 'user.id'
            }
        }
    };
}
