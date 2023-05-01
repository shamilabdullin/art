import { ResponsiveData } from "./base"
import { url } from "./base"

class PaintingsApi {

	private url = `${url}artworks/`

	getPainting(id: string): Promise <ResponsiveData> {
		return fetch(this.url + id)
			.then(response => response.json())
	}

	getPaintings(page: string): Promise <ResponsiveData> {
		return fetch(this.url + `?page=${page}`)
			.then(response => response.json())
	}

	getPaintingsQuery(query: string = '', page: string = '1'): Promise <ResponsiveData> {
		return fetch(this.url + `search?q=${query}&page=${page}`)
			.then(response => response.json())
	}

	getArtistsPaintings(query: string, artist_id: string, page: string): Promise <ResponsiveData> {
		return fetch(this.url + `search?query[term][artist_id]=${artist_id}&page=${page}`)  // search?q=${query}&query[term][artist_id]=${artist_id}
			.then(responsive => responsive.json())
	}

}

export const paintingsApi =  new PaintingsApi()