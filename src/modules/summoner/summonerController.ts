import {NextFunction, Request, Response} from 'express';
import SummonerService from "./summonerService";
import SummonerRepository from "./summonerRepository";
import {ISummonerProvider} from "./summonerProvider";

interface ISummonerControllerDeps {
    repository: SummonerRepository
    provider: ISummonerProvider
}

export class SummonerController {
    private readonly summonerService;

    constructor(deps: ISummonerControllerDeps) {
        this.summonerService = new SummonerService(deps.repository, deps.provider);
    }

    public Name(req: Request, res: Response, next: NextFunction) {
        this.summonerService
            .GetByName(req.params.name)
            .then((resWrapper) => {
                res.status(200).json(resWrapper);
            })
            //need to do next with the error to catch async errors
            .catch(error => (
                next(error)
            ));
    }

    public All(req: Request, res: Response, next: NextFunction) {
        this.summonerService
            .GetAll()
            .then((resWrapper) => {
                res.status(200).json(resWrapper);
            })
            //need to do next with the error to catch async errors
            .catch(error => (
                next(error)
            ));
    }
}
