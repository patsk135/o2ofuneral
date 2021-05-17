import DonationTransactionModel, {
    DonationTransaction
} from '../models/donation_transaction.model';

export interface CreateDonationTransaction {
    user_id: string;
    reference: string;
    donator: string;
    condolence_word: string;
    amount: number;
}

export interface IDonationTransactionRepository {
    create(data: CreateDonationTransaction): Promise<DonationTransaction>;
    findOne(
        condition: Partial<DonationTransaction>
    ): Promise<DonationTransaction | undefined>;
    findMany(id: string): Promise<DonationTransaction[] | undefined>;
    updateOneById(
        id: string,
        update: Partial<DonationTransaction>
    ): Promise<DonationTransaction | undefined>;
}

export class DonationTransactionRepository
    implements IDonationTransactionRepository
{
    create(data: CreateDonationTransaction) {
        return DonationTransactionModel.query().insert(data);
    }

    findOne(condition: Partial<DonationTransaction>) {
        return DonationTransactionModel.query().findOne(condition);
    }

    findMany(id: string) {
        return DonationTransactionModel.query().where({
            user_id: id,
            status: true
        });
    }

    updateOneById(id: string, update: Partial<DonationTransaction>) {
        return DonationTransactionModel.query().patchAndFetchById(id, update);
    }
}
