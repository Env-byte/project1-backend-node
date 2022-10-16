import {NextFunction, Request, Response} from 'express';
import SummonerService from "./summonerService";
import SummonerRepository from "./summonerRepository";
import SummonerProvider from "./summonerProvider";

interface ISummonerControllerDeps {
    repository: SummonerRepository
    provider: SummonerProvider
}

export class SummonerController {
    private readonly summonerService;

    constructor(deps: ISummonerControllerDeps) {
        this.summonerService = new SummonerService(deps.repository, deps.provider);
    }

    public Name(req: Request, res: Response, next: NextFunction) {
        this.summonerService.GetByName(req.params.name).then((summoner) => {
            res.status(200).json(summoner);
        });
    }

    public All(req: Request, res: Response, next: NextFunction) {
        this.summonerService.GetAll()
            .then((summoners) => {
                res.status(200).json(summoners);
            })
    }
}
