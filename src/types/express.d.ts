import {IRegion} from "./Region";

declare module 'express-serve-static-core' {
    export interface Request {
        region: IRegion
    }
}