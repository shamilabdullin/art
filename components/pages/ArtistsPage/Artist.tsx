import React, { useEffect, useState } from 'react'
import styles from './ArtistPage.module.sass'
import { paintingsApi } from '@/api/paintings'
import { Collage } from '@/components/Collage'
import { PaintingModel, PaintingQueryModel } from '@/types/Paintings'

const queryPainting: PaintingQueryModel = {
	api_link: '',
	api_model: '',
	id: '444',
	is_boosted: false,
	thumbnail: null,
	timestamp: '',
	title: '',
	_score: 0
}

const painting: PaintingModel = {
	id: 1,
	title: '',
	image_id: '90bc0cec-0d4e-9af5-3912-52a082a428e5',
	artist_title: '',
	category_titles: [''],
	classification_title: '',
	date_end: 0,
	date_start: 0,
	department_title: '',
	dimensions: '',
	exhibition_history: '',
	place_of_origin: '',
	provenance_text: '',
	publication_history: '',
	medium_display: ''
}

const Artist = () => {

	const [artistPaintings, setArtistPaintings] = useState<PaintingQueryModel[]>([queryPainting])  // low model
	const [isLoading, setIsLoading] = useState(false)
	const [paintings, setPaintings] = useState<any[] | PaintingModel[]>([painting])

	useEffect(() => {
		setIsLoading(true)
		paintingsApi.getArtistsPaintings('Monet', '35809')  //'Monet', '35809'
			.then(artistPaintings => setArtistPaintings(artistPaintings.data))
			// .then(res => setIsLoading(false))
	}, [])

	useEffect(() => {
		let paintingsBuffer: [PaintingModel] | any[] = new Array(artistPaintings.length)
		for (let i = 0; i < paintingsBuffer.length; i++) {
			const id = artistPaintings[i].id
			paintingsApi.getPainting(id)
				.then(painting => paintingsBuffer.push(painting.data))
				.then(res => {
					if (i === 5) {
						console.log(paintingsBuffer.length)
						setPaintings(paintingsBuffer)
						setIsLoading(false)
					}
				})
		}
	}, [artistPaintings])

  return (
	<div className={styles.container}>
		<Collage paintings={paintings}/>
	</div>
  )
}

export default Artist