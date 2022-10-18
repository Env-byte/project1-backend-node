interface RiotError {
    status: Error
}

interface Error {
    message: string
    status_code: number
}
