type TProvider = 'Database' | 'Riot API'

export class Response<T> {
    public value;
    public provider;

    constructor(value: T, provider: TProvider) {
        this.value = value
        this.provider = provider;
    }
}