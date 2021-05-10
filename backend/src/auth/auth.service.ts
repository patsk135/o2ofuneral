import { LoginInput, RegisterInput } from './auth.interface';
import { compare, hash } from 'bcryptjs';

import { BadRequestError } from '../error/HttpError';
import { Config } from '../config';
import { Dependencies } from '../container';
import { IMailService } from '../mail/mail.service';
import { IUserRepository } from '../user/user.repository';
import { IVerificationTokenRepository } from './verificationToken.repository';
import { User } from '../models/user.model';
import { VerificationToken } from '../models/verification_token.model';
import { omit } from 'ramda';
import { randomNumString } from '../utils';

export interface IAuthService {
    registerUser(input: RegisterInput): Promise<Omit<User, 'password'>>;
    login(input: LoginInput): Promise<Omit<User, 'password'>>;
    createVerificationToken(user_id: string): Promise<VerificationToken>;
    sendVerificationEmail(
        user: { email: string; id: string },
        token: string
    ): Promise<any>;
    verifyUser(userID: string, token: string): Promise<User>;
}

export class AuthService implements IAuthService {
    private readonly userRepository: IUserRepository;
    private readonly verificationTokenRepository: IVerificationTokenRepository;
    private readonly config: Config;
    private readonly mailService: IMailService;
    constructor({
        userRepository,
        verificationTokenRepository,
        config,
        mailService
    }: Dependencies<
        IUserRepository | IVerificationTokenRepository | Config | IMailService
    >) {
        this.userRepository = userRepository;
        this.verificationTokenRepository = verificationTokenRepository;
        this.config = config;
        this.mailService = mailService;
    }

    async registerUser(input: RegisterInput) {
        const hashed = await hash(input.password, 10);
        const user = await this.userRepository.create({
            ...input,
            password: hashed
        });
        return omit(['password'], user);
    }

    async createVerificationToken(user_id: string) {
        const token = randomNumString(6);
        return this.verificationTokenRepository.create({
            token,
            user_id
        });
    }

    async sendVerificationEmail(user: User, token: string) {
        const { email, id } = user;

        const link = `http://${this.config.BASE_URL}/auth/verify?userID=${id}&token=${token}`;

        const formHtml = `<a>Welcome to o2oFuneral! Please verify your account by clicking on the link below.</a>
        <form action=${link} method="POST">
            <input name="userID" id="userID" value=${id}>
            <input name="token" id="token" value=${token}>
            <button>Verify</button>
        </form>`;

        return this.mailService.sendMail({
            to: email,
            subject: `o2oFuneral Account Email Verification`,
            html: `<a href=${link}>Verify</a>`
        });
    }

    async verifyUser(user_id: string, token: string) {
        const newUser = await this.userRepository.findOneById(user_id);
        if (!newUser)
            throw new BadRequestError(
                'Verification failed. User ID or token is invalid.'
            );
        const verificationToken = await this.verificationTokenRepository.findOne(
            { user_id, token }
        );
        if (!verificationToken)
            throw new BadRequestError(
                'Verification failed. User ID or token is invalid.'
            );
        return (await this.userRepository.updateOneById(user_id, {
            is_verified: true
        })) as User;
    }

    async login(input: LoginInput) {
        const user = await this.userRepository.findOne({
            username: input.username
        });
        if (!user) throw new Error('Wrong username or password.');
        const correct = await compare(input.password, user.password);
        if (!correct) throw new Error('Wrong username or password.');
        return user;
    }
}
