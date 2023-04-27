import { ResponsiveData } from "./base"
import { url } from "./base"

class ArtistsApi {
	private url = url + 'artists/'

	getArtists(page: string): Promise <ResponsiveData> {
		return fetch(`https://api.artic.edu/api/v1/artists?page=${page}&limit=10`)
			.then(response => response.json())
	}

	getArtist(id: string): Promise <ResponsiveData> {
		return fetch(`https://api.artic.edu/api/v1/artists/${id}`)
			.then(response => response.json())
	}

	getArtistsQuery(query: string): Promise <ResponsiveData> {
		return fetch(this.url + `search?q=${query}`)
			.then(response => response.json())
	}

}

export const artistsApi = new ArtistsApi()