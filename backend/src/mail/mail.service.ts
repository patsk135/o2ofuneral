import * as nodemailer from 'nodemailer';

import { Config } from '../config';
import { Dependencies } from '../container';
import Mail from 'nodemailer/lib/mailer';

interface MailOptions {
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
}

export interface IMailService {
    sendMail(data: MailOptions): Promise<any>;
}

export class MailService implements IMailService {
    private readonly mailer: Mail;
    constructor({ config }: Dependencies<Config>) {
        this.mailer = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kookkookfarm12@gmail.com',
                pass: 'hikookkook123'
            }
        });
    }

    sendMail(options: MailOptions) {
        return this.mailer.sendMail(options);
    }
}
