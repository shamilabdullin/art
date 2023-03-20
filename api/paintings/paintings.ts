type PaintingData = {
	config: {};
	data: any;
	info: {};
	pagination?: {};
}

class PaintingsApi {

	private url = 'https://api.artic.edu/api/v1/artworks/'

	getPainting(id: string): Promise <PaintingData> {
		return fetch(this.url + id)
			.then(response => response.json())
	}

	getPaintings(page: string): Promise <PaintingData> {
		return fetch(this.url + `?page=${page}`)
			.then(response => response.json())
	}

	getPaintingsQuery(query: string): Promise <PaintingData> {
		return fetch(this.url + `search?q=${query}`)
			.then(response => response.json())
	}

}

export const paintingsApi =  new PaintingsApi()