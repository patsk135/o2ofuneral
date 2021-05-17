import { Dependencies } from '../container';
import { DonationTransaction } from '../models/donation_transaction.model';
import { IDonationTransactionRepository } from './donationTransaction.repository';
import { IMailService } from '../mail/mail.service';

export interface IDonationService {
    getPaymentStatus(donationID: string): Promise<string>;
    getUserDonationTransactions(
        userID: string
    ): Promise<DonationTransaction[] | undefined>;
}

export class DonationService implements IDonationService {
    private readonly donationTransactionRepository: IDonationTransactionRepository;
    private readonly mailService: IMailService;
    constructor({
        donationTransactionRepository,
        mailService
    }: Dependencies<IDonationTransactionRepository | IMailService>) {
        this.donationTransactionRepository = donationTransactionRepository;
        this.mailService = mailService;
    }

    async getPaymentStatus(donationID: string) {
        const donationTransaction =
            await this.donationTransactionRepository.findOne({
                reference: donationID
            });
        if (donationTransaction!.status) {
            return 'paid';
        } else {
            return 'unpaid';
        }
    }

    async getUserDonationTransactions(userID: string) {
        return this.donationTransactionRepository.findMany(userID);
    }

    async requestForWithdraw(userID: string) {}

    async sendEmailVerification(id: string) {}
}
