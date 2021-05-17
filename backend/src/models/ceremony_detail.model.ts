import { GenID } from './decorators';
import { Model } from 'objection';
import { v4 as uuidv4 } from 'uuid';

export interface CeremonyDetail {
    id: string;
    user_id: string;
    name: string;
    lastname: string;
    startDate: Date;
    endDate: Date;
    location: string;
    description: string;
}

@GenID(uuidv4)
export default class CeremonyDetailModel
    extends Model
    implements CeremonyDetail
{
    id!: string;
    user_id!: string;
    name!: string;
    lastname!: string;
    startDate!: Date;
    endDate!: Date;
    location!: string;
    description!: string;
    static tableName = 'ceremony_detail';
    static relationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'user',
            join: {
                from: 'ceremony_detail.user_id',
                to: 'user.id'
            }
        }
    };
}
