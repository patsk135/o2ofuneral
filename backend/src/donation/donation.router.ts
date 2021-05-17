import { Router } from 'express';
import { container } from '../container';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = Router();

const { donationService, withdrawRequestRepository } = container;

router.get('/transaction', async (req, res) => {
    // console.log(req.query.donationID);
    const donationID = req.query.donationID as string;
    const payload = await donationService.getPaymentStatus(donationID);
    res.json(payload);
});

router.get('/transactions', isAuthenticated, async (req, res) => {
    const payload = await donationService.getUserDonationTransactions(
        res.locals.userID
    );
    // console.log(payload);
    res.json(payload);
});

router.get('/withdraw', isAuthenticated, async (req, res) => {
    const payload = await withdrawRequestRepository.findOne({
        user_id: res.locals.userID
    });
    if (payload) {
        console.log('Update Request');
        res.json(
            await withdrawRequestRepository.updateOneById(payload.id, {
                is_paid: false
            })
        );
    } else {
        console.log('Create new Request');
        res.json(
            await withdrawRequestRepository.create({
                user_id: res.locals.userID,
                is_paid: false
            })
        );
    }
});

export { router as DonationRouter };
