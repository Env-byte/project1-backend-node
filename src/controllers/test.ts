import {NextFunction, Request, Response} from 'express';

// newTea function for post tea route
export const newTest = (req: Request, res: Response, next: NextFunction) => {
    res.json({message: "POST new tea"}); // dummy function for now
};

// newTea function for post tea route
export const getTest = (req: Request, res: Response, next: NextFunction) => {
    res.json({message: "POST new tea"}); // dummy function for now
};