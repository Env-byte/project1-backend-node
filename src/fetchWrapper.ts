import envs from "./environment";

class FetchWrapper {
    //called on every request
    private getHeader() {
        let headers = new Headers();
        headers.append('accept', '*/*');
        headers.append("X-Riot-Token", envs.riot.apiKey);
        return headers
    }

    public async get<TResponseBody>(request: string): Promise<TResponseBody> {
        return this.execFetch<TResponseBody>(request, {
            method: 'GET',
            headers: this.getHeader(),
        });
    }

    private async execFetch<T>(url: string, init?: RequestInit): Promise<T> {
        const response = await fetch(url, init);
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
        }
        return await response.json() as T
    }
}

export default FetchWrapper;



