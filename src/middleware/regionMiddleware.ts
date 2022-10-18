import {Request, Response, NextFunction} from 'express';
import {IRegion, TPlatformRegion, TRegion, TRegionRoute} from "../types/Region";

/**
 *
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
function RegionMiddleware(req: Request, res: Response, next: NextFunction) {

    let region = req.header('Region');
    if (typeof region !== 'string') {
        throw new Error(`Invalid region: ${region}. Type ${typeof region}`);
    }


    req.region = GetRegion(region as TRegion);

    next();
}

export function GetRegion(region: TRegion): IRegion {
    let platformRoute: TPlatformRegion,
        regionalRoute: TRegionRoute;
    switch (region) {
        case "EUN1":
            platformRoute = "https://eun1.api.riotgames.com";
            regionalRoute = "https://europe.api.riotgames.com";
            break;
        case "EUW1":
            platformRoute = "https://euw1.api.riotgames.com";
            regionalRoute = "https://europe.api.riotgames.com";
            break;
        case "NA1":
            platformRoute = "https://na1.api.riotgames.com"
            regionalRoute = "https://americas.api.riotgames.com";

            break;
        default:
            throw new Error(`Region ${region} is not supported.`);
    }

    return {platformRoute, regionalRoute, region};
}

export default RegionMiddleware;