import Summoner from "./types/summoner";
import {IRegion} from "../../types/Region";
import FetchWrapper from "../../fetchWrapper";

export interface ISummonerProvider {
    GetByName: (name: string) => Promise<Summoner>
}

interface SummonerProviderDeps {
    region: IRegion;
    fetch: FetchWrapper
}

class SummonerProvider implements ISummonerProvider {
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