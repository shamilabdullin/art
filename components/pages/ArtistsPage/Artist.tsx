import React, { useEffect, useState } from 'react'

// Components
import { Collage } from '@/components/Collage'
import { Loading } from '@/components/Loading'
import { PageController } from '@/components/PageController'

// Stores, utils, libs
import { paintingsApi } from '@/api/paintings'
import { PaintingModel, PaintingQueryModel } from '@/types/Paintings'
import sadSmile from 'public/sad-smile.svg'
import Image from 'next/image'
import { useArtistStore } from '@/stateManagement/artistsStore'

// CSS
import styles from './ArtistPage.module.sass'

const Artist: React.FC = () => {

	const [artistPaintings, setArtistPaintings] = useState<PaintingQueryModel[]>([]) 
	const [isLoading, setIsLoading] = useState(false)
	const [paintings, setPaintings] = useState<any[] | PaintingModel[]>([])
	const [currentPage, setCurrentPage] = useState('1')
	const [totalPages, setTotalPages] = useState('1')
	const currentArtist = useArtistStore(state => state.currentArtist)

	useEffect(() => {
		setIsLoading(true)
		const currentUrl = window.location.href.split('/')[4]
		paintingsApi.postArtistsPaintings('', currentUrl, currentPage)
			.then(res => {
				setArtistPaintings(res.data)
				if (res.pagination) {
					setTotalPages(res.pagination?.total_pages)
				}
				if (res.data.length === 0) setIsLoading(false)
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
					{paintings[0] ? 
					<>
						<div className={styles.artist_name}>
							{/* <h2>{paintings[0] ? paintings[0].artist_title : 'Artist title'}</h2> */}
							<h1>{currentArtist === '' ? "Artist's title" : currentArtist}</h1>
						</div>
						<Collage paintings={paintings}/>
						<PageController page={currentPage} setPage={setCurrentPage} totalPages={totalPages}/>
					</> :
					<div className={styles.no_public_domain}>
						<div>
							<div className={styles.no_public_title}>
								<h1>Sorry, we haven&apos;t got paintings of this artist in public domain</h1>
							</div>
							<Image src={sadSmile} alt='sad smile' width={150} height={150}/>
						</div>
					</div>	
				}
				</div>
			</div>
		}
	</div>
  )
}

export default Artist

// const queryPainting: PaintingQueryModel = {
// 	api_link: '',
// 	api_model: '',
// 	id: '444',
// 	is_boosted: false,
// 	thumbnail: null,
// 	timestamp: '',
// 	title: '',
// 	_score: 0
// }

// const painting: PaintingModel = {
// 	id: 1,
// 	title: '',
// 	image_id: '90bc0cec-0d4e-9af5-3912-52a082a428e5',
// 	artist_title: '',
// 	category_titles: [''],
// 	classification_title: '',
// 	date_end: 0,
// 	date_start: 0,
// 	department_title: '',
// 	dimensions: '',
// 	exhibition_history: '',
// 	place_of_origin: '',
// 	provenance_text: '',
// 	publication_history: '',
// 	medium_display: ''
// }