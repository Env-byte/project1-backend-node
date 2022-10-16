import {IEnvironment} from "./types/environment";
import fs from "fs";

const dotenv = require('dotenv');

const isDev = (process.env.NODE_ENV !== undefined)
const result = dotenv.config({path: `./.env.${isDev ? (process.env.NODE_ENV) : ''}`});
if (result.error) {
    throw result.error;
}
//simplified envs object
const envs: IEnvironment = {
    port: result.parsed.PORT,
    isDev: isDev,
    ssl: {
        key: Buffer.alloc(0, ""),
        cert: Buffer.alloc(0, ""),
    },
    project: {
        name: result.parsed.PROJECT_NAME,
        version: result.parsed.PROJECT_VERSION
    },
    database: {
        name: result.parsed.DATABASE_NAME,
        user: result.parsed.DATABASE_USER,
        host: result.parsed.DATABASE_HOST,
        port: result.parsed.DATABASE_PORT,
        password: result.parsed.DATABASE_PASSWORD,
        searchPath: result.parsed.DATABASE_SEARCH_PATH,
        errorDetail: result.parsed.DATABASE_ERROR_DETAIL
    },
    riot: {
        apiKey: result.parsed.RIOT_API_KEY
    }
};

//ssl certificates
try {
    if (fs.existsSync(result.parsed.CERT_KEY)) {
        envs.ssl.key = fs.readFileSync(result.parsed.CERT_KEY);
    }
    if (fs.existsSync(result.parsed.CERT)) {
        envs.ssl.cert = fs.readFileSync(result.parsed.CERT);
    }
} catch (err) {
    console.error(err);
    process.exit()
}


export default envs
