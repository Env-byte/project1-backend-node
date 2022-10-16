import SummonerRepository from "./summonerRepository";
import SummonerProvider from "./summonerProvider";
import Summoner from "./types/summoner";

class SummonerService {
    private repository;
    private provider;

    constructor(repository: SummonerRepository, provider: SummonerProvider) {
        this.repository = repository;
        this.provider = provider;
    }

    public async GetByName(name: string): Promise<Summoner> {

        name = name.replace(" ", "");

        let summoner = await this.repository.GetByName(name);
        if (summoner != null) return summoner;

        summoner = this.provider.GetByName(name);
        if (summoner === null) {
            throw Error('');
        }

        this.repository.Insert(summoner);
        return summoner;
    }

    public async GetAll() {
        return await this.repository.GetAll();
    }
}

export default SummonerService;