import envs from "./environment";
import {Pool} from "pg";

const db = new Pool({
    user: envs.database.user,
    host: envs.database.host,
    database: envs.database.name,
    password: envs.database.password,
    port: envs.database.port
})

export default db;