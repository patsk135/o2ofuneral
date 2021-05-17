export interface PaymentAuthPayload {
    accessToken: 'e35a3f7f-f066-4bd4-9a2f-b58eedb521f1';
    tokenType: 'Bearer';
    expiresIn: 21600;
    expiresAt: 1618365980;
}

export type BearerToken = string;

export interface DonationInput {
    donationID: string;
    amount: number;
    condolenceWord: string;
    from: string;
    to: string;
}

export type QRCode = string;
