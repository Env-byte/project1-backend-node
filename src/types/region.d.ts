type TRegion = 'EUW1' | 'NA1' | 'EUN1';
type TPlatformRegion =
    'https://eun1.api.riotgames.com'
    | 'https://euw1.api.riotgames.com'
    | 'https://na1.api.riotgames.com';
type TRegionRoute =
    "https://europe.api.riotgames.com"
    | 'https://americas.api.riotgames.com';

export interface IRegion {
    platformRoute: TPlatformRegion
    regionalRoute: TRegionRoute
    region: TRegion
}