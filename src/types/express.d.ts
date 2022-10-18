import {IRegion} from "./region";

declare module 'express-serve-static-core' {
    export interface Request {
        region: IRegion
    }
}