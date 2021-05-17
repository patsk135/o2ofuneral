import CeremonyDetailModel, {
    CeremonyDetail
} from '../models/ceremony_detail.model';

export interface CreateCeremonyDetail {
    user_id: string;
    name: string;
    lastname: string;
    startDate: Date;
    endDate: Date;
    location: string;
    description: string;
}

export interface ICeremonyDetailRepository {
    create(data: CreateCeremonyDetail): Promise<CeremonyDetail>;
    findOne(
        condition: Partial<CeremonyDetail>
    ): Promise<CeremonyDetail | undefined>;
    updateOneById(
        id: string,
        update: Partial<CeremonyDetail>
    ): Promise<CeremonyDetail | undefined>;
}

export class CeremonyDetailRepository implements ICeremonyDetailRepository {
    create(data: CreateCeremonyDetail) {
        return CeremonyDetailModel.query().insert(data);
    }

    findOne(condition: Partial<CeremonyDetail>) {
        return CeremonyDetailModel.query().findOne(condition);
    }

    updateOneById(id: string, update: Partial<CeremonyDetail>) {
        return CeremonyDetailModel.query().patchAndFetchById(id, update);
    }
}
