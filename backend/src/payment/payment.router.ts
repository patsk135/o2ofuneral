import { DonationInput } from './payment.interface';
import { Router } from 'express';
import { container } from '../container';

const router = Router();

const { paymentService } = container;

router.post('/donate', async (req, res) => {
    console.log(req.body);
    const { donationID, amount, condolenceWord, from, to } =
        req.body as DonationInput;
    const payload = await paymentService.makeDonation(
        donationID,
        amount,
        condolenceWord,
        to,
        from
    );
    res.json(payload);
});

router.post('/confirm', async (req, res) => {
    console.log('Payment Confirmation');
    console.log(req.body);
    const paymentInfo = req.body;
    const payload = await paymentService.confirmPayment(
        paymentInfo.billPaymentRef1
    );
});

export { router as PaymentRouter };
