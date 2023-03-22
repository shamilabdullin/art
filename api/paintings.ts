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

	getPaintingsQuery(query: string): Promise <ResponsiveData> {
		return fetch(this.url + `search?q=${query}`)
			.then(response => response.json())
	}

	getArtistsPaintings(artist_title: string): Promise <ResponsiveData> {
		return fetch(this.url + `?artst_title=${artist_title}`)
			.then(responsive => responsive.json())
	}

}

export const paintingsApi =  new PaintingsApi()