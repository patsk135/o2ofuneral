import {
    LoginInput,
    LoginPayload,
    RegisterInput,
    RegisterPayload,
    VerifyUserInput
} from './auth.interface';

import { Router } from 'express';
import { container } from '../container';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { omit } from 'ramda';

const router = Router();

const { authService, jwtService, userRepository } = container;

router.post('/register', async (req, res) => {
    const input = req.body as RegisterInput;
    const user = await authService.registerUser(input);
    const token = await jwtService.generateToken(user.id);
    const verificationToken = await authService.createVerificationToken(
        user.id
    );
    authService
        .sendVerificationEmail(user, verificationToken.token)
        .catch(console.log);
    const payload: RegisterPayload = { user, token };
    res.json(payload);
});

router.post('/login', async (req, res) => {
    const input = req.body as LoginInput;
    const user = await authService.login(input);
    const token = await jwtService.generateToken(user.id, 'GUEST');
    const payload: LoginPayload = { user: omit(['password'], user), token };
    res.json(payload);
});

router.get('/ping', isAuthenticated, async (req, res) => {
    const user = await userRepository.findOneById(res.locals.userID);
    res.json(omit(['password'], user));
});

router.get('/verify', async (req, res) => {
    const { userID, token } = (req.query as unknown) as VerifyUserInput;
    const user = await authService.verifyUser(userID, token);
    res.send(user);
});

export { router as AuthRouter };
