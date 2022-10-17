import express, {Response} from 'express';
import {Request} from "express-serve-static-core";

import {SummonerController} from "../modules/summoner/summonerController";
import SummonerProvider from "../modules/summoner/summonerProvider";
import SummonerRepository from "../modules/summoner/summonerRepository";
import db from "../db";
import FetchWrapper from "../fetchWrapper";

const GetController = (req: Request) => {
    const region = req.region;
    const fetch = new FetchWrapper();
    return new SummonerController({
        provider: new SummonerProvider({region, fetch}),
        repository: new SummonerRepository({db, region}),
    });
}

const router = express.Router();

router.get("/summoner/name/:name", (req, res: Response, next) => {
    GetController(req).Name(req, res, next)
});

router.get("/summoner/", (req: Request, res, next) => {
    GetController(req).Name(req, res, next)
})
export default router
