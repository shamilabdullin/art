import { ResponsiveData } from "./base"
import { url } from "./base"

class PaintingsApi {

	private url = `${url}artworks/`

	getPainting(id: string): Promise <ResponsiveData> {
		return fetch(this.url + id)
			.then(response => response.json())
	}

	getPaintings(page: string): Promise <ResponsiveData> {
		return fetch(this.url + `search?query[term][is_public_domain]=true&page=${page}`)
			.then(response => response.json())
	}

	getPaintingsQuery(query: string = '', page: string = '1'): Promise <ResponsiveData> {
		let queryString = ''
		query !== '' ? queryString = `q=${query}&` : queryString = ''
		return fetch(this.url + `search?${queryString}query[term][is_public_domain]=true&page=${page}`)
			.then(response => response.json())
	}

	getArtistsPaintings(query: string, artist_id: string, page: string): Promise <ResponsiveData> {
		return fetch(this.url + `search?query[term][artist_id]=${artist_id}&page=${page}`)  // search?q=${query}&query[term][artist_id]=${artist_id}
			.then(responsive => responsive.json())
	}

}

export const paintingsApi =  new PaintingsApi()