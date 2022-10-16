import Summoner from "./types/summoner";

class SummonerProvider {

    constructor() {

    }

    GetByName(name: string): Summoner | null {
        throw new Error("Method not implemented.");
    }
}

export default SummonerProvider;