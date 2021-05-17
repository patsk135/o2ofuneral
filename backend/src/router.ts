import { AuthRouter } from './auth/auth.router';
import { CeremonyRouter } from './ceremony/ceremony.router';
import { DonationRouter } from './donation/donation.router';
import { PaymentRouter } from './payment/payment.router';
import { Router } from 'express';

const router = Router();

router.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});

router.use('/auth', AuthRouter);
router.use('/payment', PaymentRouter);
router.use('/donation', DonationRouter);
router.use('/ceremony', CeremonyRouter);

export { router as Router };
