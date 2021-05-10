import { AuthRouter } from './auth/auth.router';
import { PaymentRouter } from './payment/payment.router';
import { Router } from 'express';

const router = Router();

router.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});

router.use('/auth', AuthRouter);
router.use('/payment', PaymentRouter);

export { router as Router };
