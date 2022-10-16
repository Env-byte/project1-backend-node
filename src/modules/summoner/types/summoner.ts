import {ISummoner} from "../../../types/Summoner/summoner";

class Summoner {
    /**
     * Encrypted summoner ID. Max length 63 characters.
     */
    public id: string
    /**
     * Encrypted account ID. Max length 56 characters.
     */
    public accountId: string
    /**
     * Encrypted PUUID. Exact length of 78 characters.
     */
    public puuid: string
    /**
     * Summoner name.
     */
    public name: string
    /**
     * ID of the summoner icon associated with the summoner.
     */
    public profileIconId: number
    /**
     * Date summoner was last modified specified as epoch milliseconds.
     * The following events will update this timestamp: summoner name change,
     * summoner level change, or profile icon change.
     */
    public revisionDate: number
    /**
     * Summoner level associated with the summoner.
     */
    public summonerLevel: number

    /**
     * url to the users icon
     */
    public iconUrl: string

    /**
     * Last time the summoner was updated
     */
    public lastUpdate: Date

    private constructor(obj: ISummoner) {
        this.id = obj.id;
        this.accountId = obj.account_id;
        this.summonerLevel = obj.summoner_level;
        this.lastUpdate = new Date(obj.last_update);
        this.revisionDate = obj.revision_date;
        this.profileIconId = obj.profile_icon_id;
        this.name = obj.name;
        this.puuid = obj.puuid;
        this.iconUrl = "https://ddragon.leagueoflegends.com/cdn/12.15.1/img/profileicon/" + this.profileIconId + ".png";
    }

    public static FromObj(user: ISummoner) {
        return new Summoner(user);
    }
}

export default Summoner;
