import { Config } from '../config';
import { Dependencies } from '../container';
import { DonationTransaction } from '../models/donation_transaction.model';
import { IDonationTransactionRepository } from '../donation/donationTransaction.repository';
import { IUserRepository } from '../user/user.repository';
import axios from 'axios';

export interface IPaymentService {
    makeDonation(
        donationID: string,
        amount: number,
        condolenceWord: string,
        to: string,
        from: string
    ): Promise<MakeDonationPayload>;
    confirmPayment(reference: string): Promise<DonationTransaction | undefined>;
}

interface MakeDonationPayload {
    qrRawData: string;
}

interface AccessTokenPayload {
    status?: {
        code: number;
        description: string;
    };
    data?: {
        accessToken: string;
        tokenType: 'Bearer';
        expiresIn: number;
        expiresAt: number;
    };
}

interface DeeplinkPayload {
    status?: {
        code: number;
        description: string;
    };
    data: {
        transactionId: string;
        deeplinkUrl: string;
        userRefId: string;
    };
}

export class PaymentService implements IPaymentService {
    private readonly config: Config;
    private readonly donationTransactionRepository: IDonationTransactionRepository;
    private readonly userRepository: IUserRepository;
    private readonly API_KEY: string;
    private readonly API_SECRET: string;
    private readonly BILLER_ID: string;
    private readonly baseUrl =
        'https://api-sandbox.partners.scb/partners/sandbox';
    constructor({
        config,
        donationTransactionRepository,
        userRepository
    }: Dependencies<
        Config | IDonationTransactionRepository | IUserRepository
    >) {
        this.API_KEY = config.SCB_API_KEY;
        this.API_SECRET = config.SCB_API_SECRET;
        this.BILLER_ID = config.SCB_BILLER_ID;
        this.config = config;
        this.donationTransactionRepository = donationTransactionRepository;
        this.userRepository = userRepository;
    }

    async getAccessToken(donationID: string) {
        try {
            const payload = await axios.post<AccessTokenPayload>(
                `${this.baseUrl}/v1/oauth/token`,
                {
                    applicationKey: this.API_KEY,
                    applicationSecret: this.API_SECRET
                },
                {
                    headers: {
                        resourceOwnerId: this.API_KEY,
                        requestUid: donationID
                    }
                }
            );
            const {
                data: { status, data }
            } = payload;
            if (status?.code === 1000 && data?.accessToken) {
                return data.accessToken;
            } else {
                throw new Error(JSON.stringify(payload.data));
            }
        } catch (e) {
            console.log(e);
            // throw e;
        }
    }

    async requestQRPayment(donationID: string, amount: number) {
        const accessToken = await this.getAccessToken(donationID);
        console.log(accessToken);
        const payload = await axios.post(
            `${this.baseUrl}/v1/payment/qrcode/create`,
            {
                qrType: 'PP',
                ppType: 'BILLERID',
                ppId: this.BILLER_ID,
                amount: amount.toFixed(2),
                ref1: donationID,
                ref2: donationID,
                ref3: 'SCB'
            },
            {
                headers: {
                    authorization: `Bearer ${accessToken}`,
                    resourceOwnerId: this.API_KEY,
                    requestUId: donationID
                }
            }
        );
        // console.log(payload);
        const {
            data: { status, data }
        } = payload;
        if (status?.code !== 1000) {
            throw new Error(JSON.stringify(payload.data));
        }
        const { qrRawData, qrImage } = data;
        return { qrRawData, qrImage };
    }

    async requestDeepLink(donationID: string, amount: number) {
        const accessToken = await this.getAccessToken(donationID);
        console.log(accessToken);
        const payload = await axios.post<DeeplinkPayload>(
            `${this.baseUrl}/v3/deeplink/transactions`,
            {
                transactionType: 'PURCHASE',
                transactionSubType: ['BP'],
                billPayment: {
                    paymentAmount: amount.toFixed(2),
                    accountTo: this.BILLER_ID,
                    ref1: donationID,
                    ref2: donationID,
                    ref3: 'scb'
                }
            },
            {
                headers: {
                    resourceOwnerId: this.API_KEY,
                    requestUId: donationID,
                    authorization: `Bearer ${accessToken}`,
                    channel: 'scbeasy'
                }
            }
        );
        // console.log(payload);
        const {
            data: { status, data }
        } = payload;
        if (status?.code !== 1000) {
            throw new Error(JSON.stringify(payload.data));
        }

        const { deeplinkUrl, transactionId } = data;
        console.log(transactionId);

        return { deeplinkUrl, transactionID: transactionId };
    }

    async makeDonation(
        donationID: string,
        amount: number,
        condolenceWord: string,
        to: string,
        from: string
    ) {
        const { qrRawData, qrImage } = (await this.requestQRPayment(
            donationID,
            amount
        )) as any;

        const donationTransactionData = {
            user_id: to,
            reference: donationID,
            donator: from,
            condolence_word: condolenceWord,
            amount
        };
        const donationTransaction =
            await this.donationTransactionRepository.create(
                donationTransactionData
            );
        console.log(donationTransaction);

        return { qrRawData, qrImage };
    }

    async confirmPayment(reference: string) {
        const donationTransaction =
            await this.donationTransactionRepository.findOne({
                reference
            });
        return this.donationTransactionRepository.updateOneById(
            donationTransaction!.id,
            { status: true }
        );
    }
}
