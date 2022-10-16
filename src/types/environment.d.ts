interface IEnvSSL {
    key: Buffer
    cert: Buffer
}

interface IEnvProject {
    name: string
    version: string
}

interface IEnvDatabase {
    user: string
    password: string
    host: string
    name: string
    port: number
    searchPath: string
    errorDetail: boolean
}

interface IEnvRiot {
    apiKey: string
}

export interface IEnvironment {
    port: number
    ssl: IEnvSSL
    isDev: boolean
    project: IEnvProject
    database: IEnvDatabase
    riot: IEnvRiot
}

