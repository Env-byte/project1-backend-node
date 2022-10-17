import {Request, Response, NextFunction} from 'express';
import {DefaultException} from '../models/exceptions/defaultException.model';

/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param exception Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
function ErrorHandlerMiddleware(exception: TypeError | DefaultException, req: Request, res: Response, next: NextFunction) {
    if (!(exception instanceof DefaultException)) {
        exception = new DefaultException(exception.message);
    }
    // not using the next function to prevent from triggering
    // the default error-handler. However, make sure you are sending a
    // response to client to prevent memory leaks in case you decide to
    // NOT use, like in this example, the NextFunction .i.e., next(new Error())
    res.status((exception as DefaultException).status).send(exception);
}

export default ErrorHandlerMiddleware;