//Require the dev-dependencies
process.env.NODE_ENV = 'test';

import addr from "./../../server";
import chai from "chai";
import chaiHttp from "chai-http";

//During the test the env variable is set to test

chai.use(chaiHttp);
chai.should();
//Our parent block


describe('Testing summoner routes', function () {
    this.timeout(10000);
    beforeEach((done) => { //Before each test we empty the database
        done();
    });

    it('it should GET ntenvious from provider and store in database', (done) => {
        chai.request(addr)
            .get('/api/summoner/name/ntenvious')
            .set('Region', 'EUW1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.to.include({
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
});