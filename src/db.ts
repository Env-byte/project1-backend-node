import {Pool} from "pg";
import envs from "./environment";
const pool = new Pool({
    user: envs.database.user,
    host: envs.database.host,
    database: envs.database.name,
    password: envs.database.password,
    port: envs.database.port
})

export default pool;