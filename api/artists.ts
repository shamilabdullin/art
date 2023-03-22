import { ResponsiveData } from "./base"
import { url } from "./base"

class ArtistsApi {
	private url = url + 'artists/'

	getArtists(page: string): Promise <ResponsiveData> {
		return fetch(`https://api.artic.edu/api/v1/artists?page=${page}&limit=10`)
			.then(response => response.json())
	}

}

export const artistsApi = new ArtistsApi()