import * as dotenv from 'dotenv';

dotenv.config();

const env = new Proxy(process.env as Record<string, string>, {
    get(obj, prop: string) {
        const variable = obj[prop];
        if (!variable) {
            throw new Error(`${prop} is not set in environment variables.`);
        }
        return variable;
    }
});

export const config = {
    PORT: env.PORT,
    NODE_ENV: env.NODE_ENV,
    DB_URI: env.DB_URI,
    DB: env.DB,
    SECRET: env.SECRET,
    BASE_URL: env.BASE_URL,
    MAILER_USER: env.MAILER_USER,
    MAILER_CLIENT_ID: env.MAILER_CLIENT_ID,
    MAILER_CLIENT_SECRET: env.MAILER_CLIENT_SECRET,
    MAILER_REFRESH_TOKEN: env.MAILER_REFRESH_TOKEN,
    SCB_API_KEY: env.SCB_API_KEY,
    SCB_API_SECRET: env.SCB_API_SECRET,
    SCB_BILLER_ID: env.SCB_BILLER_ID
};

export type Config = typeof config;
