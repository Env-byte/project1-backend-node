import SummonerRepository from "./summonerRepository";
import SummonerProvider from "./summonerProvider";
import Summoner from "./types/summoner";
import {Response} from "../../models/response.model";

class SummonerService {
    private repository;
    private provider;

    constructor(repository: SummonerRepository, provider: SummonerProvider) {
        this.repository = repository;
        this.provider = provider;
    }

    public async GetByName(name: string) {
        name = name.replace(" ", "");

        let summoner = await this.repository.GetByName(name);
        if (summoner != null) return new Response(summoner, 'Database');

        summoner = await this.provider.GetByName(name);
        if (summoner === null) {
            throw Error('');
        }

        this.repository.Insert(summoner);
        return new Response(summoner, 'Riot API');
    }

    public async GetAll() {
        const summoners = await this.repository.GetAll();
        return new Response(summoners, 'Database');
    }
}

export default SummonerService;