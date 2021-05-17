import WithdrawRequestModel, {
    WithdrawRequest
} from '../models/withdraw_request.model';

export interface CreateWithdrawRequest {
    user_id: string;
    is_paid: boolean;
}

export interface IWithdrawRequestRepository {
    create(data: CreateWithdrawRequest): Promise<WithdrawRequest>;
    findOne(
        condition: Partial<WithdrawRequest>
    ): Promise<WithdrawRequest | undefined>;
    updateOneById(
        id: string,
        update: Partial<WithdrawRequest>
    ): Promise<WithdrawRequest | undefined>;
}

export class WithdrawRequestRepository implements IWithdrawRequestRepository {
    create(data: CreateWithdrawRequest) {
        return WithdrawRequestModel.query().insert(data);
    }

    findOne(condition: Partial<WithdrawRequest>) {
        return WithdrawRequestModel.query().findOne(condition);
    }

    updateOneById(id: string, update: Partial<WithdrawRequest>) {
        return WithdrawRequestModel.query().patchAndFetchById(id, update);
    }

    deleteOneById(id: string) {
        return WithdrawRequestModel.query().deleteById(id);
    }
}
