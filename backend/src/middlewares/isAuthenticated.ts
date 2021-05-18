import { Bearer } from 'permit';
import { RequestHandler } from 'express';
import { UnauthorizedError } from '../error/HttpError';
import { container } from '../container';

const permit = new Bearer({});
const { userRepository } = container;

export const isAuthenticated: RequestHandler = async (req, res, next) => {
    const token = permit.check(req);
    if (!token) {
        permit.fail(res);
        return next(new UnauthorizedError(`Authentication is required!`));
    }
    const { userID } = await container.jwtService.verifyToken(token);
    if (!userID) {
        permit.fail(res);
        return next(new UnauthorizedError(`Authentication is required!`));
    }

    res.locals.userID = userID;
    // res.locals.role = role;
    next();
};
