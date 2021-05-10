export interface PaymentAuthPayload {
    accessToken: 'e35a3f7f-f066-4bd4-9a2f-b58eedb521f1';
    tokenType: 'Bearer';
    expiresIn: 21600;
    expiresAt: 1618365980;
}

export type BearerToken = string;

export interface DonationInput {
    amount: number;
    condolenceWord: string;
    name: string;
}

export type QRCode = string;
