import envs from "./environment";
import {NotFoundException} from "./models/exceptions/notFoundException.model";

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
            routeErrors(await response.text())
        }
        return await response.json() as T
    }
}


function routeErrors(error: string) {
    let riotError: RiotError
    try {
        riotError = JSON.parse(error) as RiotError
    } catch (e) {
        throw new Error(error);
    }
    if (riotError.status && riotError.status.status_code) {
        switch (riotError.status.status_code) {
            case 404:
                throw new NotFoundException(riotError.status.message)
        }
    } else {
        throw new Error(error);
    }
}

export default FetchWrapper;



