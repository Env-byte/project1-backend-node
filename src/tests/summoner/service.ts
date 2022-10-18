//Require the dev-dependencies
import SummonerService from "../../modules/summoner/summonerService";

process.env.NODE_ENV = 'test';

import chai from "chai";
import SummonerProvider from "../../modules/summoner/summonerProvider";
import SummonerRepository from "../../modules/summoner/summonerRepository";
import db from "../../db";
import {GetRegion} from "../../middleware/regionMiddleware";
import FetchWrapper from "../../fetchWrapper";
import {NotFoundException} from "../../models/exceptions/notFoundException.model";

//During the test the env variable is set to test

chai.should();
//Our parent block


describe('Testing summoner routes', function () {
    const region = GetRegion('EUW1');
    const service = new SummonerService(
        new SummonerRepository({db, region}),
        new SummonerProvider({region, fetch: new FetchWrapper()}),
    )
    this.timeout(10000);
    beforeEach((done) => { //Before each test we empty the database
        done();
    });

    it('should GET ntenvious from provider and store in database', (done) => {
        service.GetByName('ntenvious').then((summoner) => {
            summoner.should.be.to.include({
                "id": "wXHwJVrRW7_CEWt3le4t3W2djryuuROout7ecORm3d2xr_8",
                "accountId": "sR7CA_Q3Ep0wX3KOgI9qy1YWZkkoYwk1qZRV-A8TzWsk7FM",
                "puuid": "4KWSUXAEBmOcW-yllZwnttwjSIF9vF7wLOcWMtKcCAw3kpV_DaR00hnPnev3mntYbOInin5p4R4lxg",
                "name": "nT Envious",
                "profileIconId": 936,
                "revisionDate": 1665832419000,
                "summonerLevel": 198

            });
            done();
        });
    });

    it('should throw not found', (done) => {
        service.GetByName('somereallylongnamethatdoesnotexist').then((summoner) => {

        }).catch((e) => {
            e.should.be.instanceof(NotFoundException)
            done();
        });
    })


});