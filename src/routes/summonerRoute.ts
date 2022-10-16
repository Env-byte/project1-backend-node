import express from "express";
import {SummonerController} from "../modules/summoner/summonerController";
import SummonerProvider from "../modules/summoner/summonerProvider";
import SummonerRepository from "../modules/summoner/summonerRepository";
import db from "../db";

const router = express.Router();
/**
 * @openapi
 * /summoner/name/:name:
 *   get:
 *    summary: Get By Name using db or provider
 *    tags:
 *      - Summoner
 *    responses:
 *      200:
 *          description: Returns a mysterious string.
 */
router.get("/summoner/name/:name", (req, res, next) => {
    const controller = new SummonerController({
        provider: new SummonerProvider(),
        repository: new SummonerRepository(db)
    });
    controller.Name(req, res, next)
});


/**
 * @openapi
 * /summoner:
 *   get:
 *     summary: Get All players in db
 *     tags:
 *      - Summoner
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get("/summoner/", (req, res, next) => {
    const controller = new SummonerController({
        provider: new SummonerProvider(),
        repository: new SummonerRepository(db)
    });
    controller.All(req, res, next)
})
export default router
