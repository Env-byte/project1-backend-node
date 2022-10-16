import {Pool} from "pg";
import {ISummoner} from "../../types/Summoner/summoner";
import Summoner from "./types/summoner";

class SummonerRepository {
    private db;

    constructor(db: Pool) {
        this.db = db
    }

    public async GetByName(name: string) {
        const {rows} = await this.db.query<ISummoner, [string]>(`
            SELECT id,
                   account_id,
                   puuid,
                   name,
                   profile_icon_id,
                   revision_date,
                   summoner_level,
                   last_update
            FROM summoners
            WHERE lower(replace(name, ' ', '')) = lower($1)
              AND region =@ region
        `, [name]);

        if (rows.length === 0) {
            return null;
        }
        return Summoner.FromObj(rows[0]);
    }

    public async GetAll() {
        const {rows} = await this.db.query<ISummoner, []>(`
            SELECT id,
                   account_id,
                   puuid,
                   name,
                   profile_icon_id,
                   revision_date,
                   summoner_level,
                   last_update
            FROM summoners
        `);
        let summoners: Summoner[] = [];
        for (let i = 0, iL = rows.length; i < iL; i++) {
            summoners.push(Summoner.FromObj(rows[i]));
        }
        return summoners;
    }

    public Insert(summoner: Summoner) {
        this.db.query<ISummoner, []>(`
            SELECT id,
                   account_id,
                   puuid,
                   name,
                   profile_icon_id,
                   revision_date,
                   summoner_level,
                   last_update
            FROM summoners
        `);

    }
}

export default SummonerRepository;