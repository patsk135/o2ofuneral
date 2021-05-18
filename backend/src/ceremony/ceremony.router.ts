import { Router } from 'express';
import { container } from '../container';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { omit } from 'ramda';

const router = Router();

const { ceremonyDetailRepository } = container;

router.get('/detail', async (req, res) => {
    const id = req.query.id as string;
    const payload = await ceremonyDetailRepository.findOne({ user_id: id });
    // console.log(payload);
    res.json(omit(['id', 'user_id'], payload));
});

router.post('/update', isAuthenticated, async (req, res) => {
    const user_id = res.locals.userID;
    const { ceremonyDetail } = req.body;
    const oldCeremonyDetail = await ceremonyDetailRepository.findOne({
        user_id
    });
    // console.log(oldCeremonyDetail);
    // console.log(ceremonyDetail);
    const payload = await ceremonyDetailRepository.updateOneById(
        oldCeremonyDetail!.id,
        {
            ...ceremonyDetail
        }
    );
    console.log(payload);
    res.json(payload);
});

export { router as CeremonyRouter };
