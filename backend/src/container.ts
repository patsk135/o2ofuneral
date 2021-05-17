import { AuthService, IAuthService } from './auth/auth.service';
import {
    CeremonyDetailRepository,
    ICeremonyDetailRepository
} from './ceremony/ceremonydetail.repository';
import { Config, config } from './config';
import { DonationService, IDonationService } from './donation/donation.service';
import {
    DonationTransactionRepository,
    IDonationTransactionRepository
} from './donation/donationTransaction.repository';
import { IJwtService, JwtService } from './auth/jwt.service';
import { IMailService, MailService } from './mail/mail.service';
import { IPaymentService, PaymentService } from './payment/payment.service';
import { IUserRepository, UserRepository } from './user/user.repository';
import {
    IVerificationTokenRepository,
    VerificationTokenRepository
} from './auth/verificationToken.repository';
import {
    IWithdrawRequestRepository,
    WithdrawRequestRepository
} from './donation/withdrawRequest.repository';
import { InitializeDatabase, makeInitializeDatabase } from './db';
import {
    Resolver,
    asClass,
    asFunction,
    asValue,
    createContainer
} from 'awilix';

export interface AllDependencies {
    config: Config;
    initializeDatabase: InitializeDatabase;
    userRepository: IUserRepository;
    authService: IAuthService;
    jwtService: IJwtService;
    verificationTokenRepository: IVerificationTokenRepository;
    mailService: IMailService;
    paymentService: IPaymentService;
    donationTransactionRepository: IDonationTransactionRepository;
    donationService: IDonationService;
    ceremonyDetailRepository: ICeremonyDetailRepository;
    withdrawRequestRepository: IWithdrawRequestRepository;
}

type RegisterDeps<T> = {
    [P in keyof T]: Resolver<T[P]>;
};

export const dependencies: RegisterDeps<AllDependencies> = {
    config: asValue(config),
    initializeDatabase: asFunction(makeInitializeDatabase),
    userRepository: asClass(UserRepository),
    authService: asClass(AuthService),
    jwtService: asClass(JwtService),
    verificationTokenRepository: asClass(VerificationTokenRepository),
    mailService: asClass(MailService),
    paymentService: asClass(PaymentService),
    donationTransactionRepository: asClass(DonationTransactionRepository),
    donationService: asClass(DonationService),
    ceremonyDetailRepository: asClass(CeremonyDetailRepository),
    withdrawRequestRepository: asClass(WithdrawRequestRepository)
};

const DIContainer = createContainer();

DIContainer.register(dependencies);

export const container = DIContainer.cradle as AllDependencies;

type SubType<Base, Condition> = Pick<
    Base,
    {
        [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
    }[keyof Base]
>;

export type Dependencies<Types> = SubType<AllDependencies, Types>;
