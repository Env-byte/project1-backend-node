class FetchWrapper {

    //called on every request
    private getHeader(data?: HeaderData) {
        let headers = new Headers();
        headers.append('accept', '*/*');
        headers.append('Api-Token', (data?.token) ?? "");
        headers.append('Region', (data?.region) ?? "");
        headers.append('Content-Type', (data?.contentType) ?? 'application/x-www-form-urlencoded');
        return headers
    }

    public async get<TResponseBody>(request: string, data?: HeaderData): Promise<TResponseBody> {
        return this.execFetch(this.ApiPrefix + request, {
            method: 'GET',
            headers: this.getHeader(data),
        });
    }

    private async execFetch<T>(url: string, init?: RequestInit): Promise<T> {

        const response = await fetch(url, init);
        if (!response.ok) {
            return new Promise((resolve, reject) => {
                response
                    .text()
                    .then(text => {
                        reject(text);
                    })
            })
        }
        return response.json()
    }
}


interface HeaderData {
    region?: string,
    token?: string,
    contentType?: string
}

