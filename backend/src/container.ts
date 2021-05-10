import { AuthService, IAuthService } from './auth/auth.service';
import { Config, config } from './config';
import { IJwtService, JwtService } from './auth/jwt.service';
import { IMailService, MailService } from './mail/mail.service';
import { IPaymentService, PaymentService } from './payment/payment.service';
import { IUserRepository, UserRepository } from './user/user.repository';
import {
    IVerificationTokenRepository,
    VerificationTokenRepository
} from './auth/verificationToken.repository';
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
    paymentService: asClass(PaymentService)
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
