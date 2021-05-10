import DonationTransactionModel, {
    DonationTransaction
} from '../models/donation_transaction.model';

export interface CreateDonationTransaction {
    user_id: string;
    donator: string;
    condolence_word: string;
    amount: number;
    status: boolean;
}

export interface IDonationTransactionRepository {
    create(data: CreateDonationTransaction): Promise<DonationTransaction>;
    findMany(id: string): Promise<DonationTransaction[] | undefined>;
}

export class DonationTransactionRepository
    implements IDonationTransactionRepository {
    create(data: CreateDonationTransaction) {
        return DonationTransactionModel.query().insert(data);
    }

    findMany(id: string) {
        return DonationTransactionModel.query().where('user_id', id);
    }
}
