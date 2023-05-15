import { ResponsiveData, ResponsivePaintingData } from "./base"
import { url } from "./base"

class PaintingsApi {

	private url = `${url}artworks/`

	private postArtistPauntingsQuery(artistId: string) {
		return {
			"query": {
				"bool": {
					"must": [
						// {
						// 	"term": {
						// 		"is_public_domain": true
						// 	}
						// },
						{
							"term": {
								"artist_id": artistId
							}					
						},
					]
				}
			}
		}
	}

	getPainting(id: string): Promise <ResponsivePaintingData> {
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
		return fetch(this.url + `search?q=${query}&query[term][artist_id]=${artist_id}&page=${page}`)
			.then(responsive => responsive.json())
	}

	postArtistsPaintings(query: string, artist_id: string, page: string): Promise <ResponsiveData> {
		return fetch(this.url + `search?q=${query}&page=${page}`, {
			method:'POST',
			headers:{
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(this.postArtistPauntingsQuery(artist_id))
		})
			.then(response => response.json())
	}

	postPaintingsStyle(style: string, page: string): Promise <ResponsiveData> {
		return fetch(this.url + `search?q=&page=${page}`, {
			method:'POST',
			headers:{
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({
				"query": {
					"bool": {
						"must": [
							{
								"term": {
									"is_public_domain": true
								}
							},
							{
								"term": {
									"style_id": style
								}					
							},
						]
					}
				}
			})
		})
			.then(response => response.json())
	}

}

export const paintingsApi =  new PaintingsApi()