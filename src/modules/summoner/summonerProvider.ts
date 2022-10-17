import Summoner from "./types/summoner";
import {IRegion} from "../../types/Region";
import FetchWrapper from "../../fetchWrapper";
import {ISummoner} from "../../types/Summoner/summoner";

interface SummonerProviderDeps {
    region: IRegion;
    fetch: FetchWrapper
}

class SummonerProvider {
    private region;
    private fetch;
    private readonly endpoint = "/tft/summoner/v1/summoners";

    constructor(deps: SummonerProviderDeps) {
        this.region = deps.region
        this.fetch = deps.fetch;
    }

    public async GetByName(name: string) {
        return await this.fetch.get<Summoner>(this.region.platformRoute + this.endpoint + "/by-name/" + encodeURIComponent(name));
    }
}

export default SummonerProvider;