import { DonationInput } from './payment.interface';
import { Router } from 'express';
import { container } from '../container';

const router = Router();

const { paymentService } = container;

router.post('/donate', async (req, res) => {
    // console.log(req.body);
    const { amount, condolenceWord, name } = req.body as DonationInput;
    const donationID = 'TESTDONATION01';
    const payload = await paymentService.makeDonation(donationID, amount);
    res.json(payload);
});

export { router as PaymentRouter };
