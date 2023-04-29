import React, { useEffect, useState } from 'react'

// Components
import { Collage } from '@/components/Collage'
import { Loading } from '@/components/Loading'

// Stores, utils, libs
import { paintingsApi } from '@/api/paintings'
import { PaintingModel, PaintingQueryModel } from '@/types/Paintings'
import loading from '../../../public/loading.json'
import Lottie from "lottie-react"

// CSS
import styles from './ArtistPage.module.sass'
import { useArtistStore } from '@/stateManagement/artistsStore'
import { PageController } from '@/components/PageController'

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

	const [artistPaintings, setArtistPaintings] = useState<PaintingQueryModel[]>([]) 
	const [isLoading, setIsLoading] = useState(false)
	const [paintings, setPaintings] = useState<any[] | PaintingModel[]>([])
	const [currentPage, setCurrentPage] = useState('1')
	const [totalPages, setTotalPages] = useState('1')
	const currentArtist = useArtistStore(state => state.currentArtist)

	useEffect(() => {
		setIsLoading(true)
		const currentUrl = window.location.href.split('/')[4]
		paintingsApi.getArtistsPaintings('', currentUrl, currentPage)
			.then(res => {
				setArtistPaintings(res.data)
				if (res.pagination) {
					setTotalPages(res.pagination?.total_pages)
				}
			})
	}, [currentPage])

	useEffect(() => {
		if (artistPaintings.length > 0) {
			setIsLoading(true)
			let ids = artistPaintings.map(artistPainting => artistPainting.id)
			let request = ids.map(id => paintingsApi.getPainting(id))
			Promise.all(request)
				.then(res => {
					const paintings = res.map(responsiveData => responsiveData.data)
					setPaintings(paintings)
					setIsLoading(false)
				})
		}
	}, [artistPaintings])

  return (
	<div>
		{isLoading ? 
			<Loading />	:
			<div className={styles.artist_page}>
				<div className={styles.container}>
					<div className={styles.artist_name}>
						{/* <h2>{paintings[0] ? paintings[0].artist_title : 'Artist title'}</h2> */}
						<h1>{currentArtist === '' ? "Artist's title" : currentArtist}</h1>
					</div>
					<Collage paintings={paintings}/>
					<PageController page={currentPage} setPage={setCurrentPage} totalPages={totalPages}/>
				</div>
			</div>
		}
	</div>
  )
}

export default Artist