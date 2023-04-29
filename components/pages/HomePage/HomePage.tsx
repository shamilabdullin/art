// Components
import { Collage } from '@/components/Collage'
import { PageController } from '../../PageController'
import { SearchBar } from '../../SearchBar'
import { Loading } from '@/components/Loading'

// Stores, utils, libs
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { PaintingModel, PaintingQueryModel } from '@/types/Paintings'
import { paintingsApi } from '@/api/paintings'
import loading from '../../../public/loading.json'
import Lottie from "lottie-react"

// CSS
import styles from './Home.module.sass'

const painting: PaintingModel = {
	id: 0,
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

export default function HomePage() {  // { paintings }: any

	const [paintings, setPaintings] = useState <PaintingModel[]> ([]);
	const [page, setPage] = useState('1')
	const [isLoading, setIsLoading] = useState(false)
	const [query, setQuery] = useState('')
	const [queryPaintings, setQueryPaintings] = useState([queryPainting])
	const [pages, setPages] = useState('1')

	useEffect(() => {
		setIsLoading(true)
		console.log('1 use')
		paintingsApi.getPaintings(page)
			.then(paintings => {
				setPaintings(paintings.data)
				if (paintings.pagination) {
					setPages(paintings.pagination.total_pages)
				}
				setIsLoading(false)
			})
			
	}, [page])

	useEffect(() => {
		if (queryPaintings.length > 1) {
			setIsLoading(true)
			const ids = queryPaintings.map(queryPainting => queryPainting.id)
			const request = ids.map(id => paintingsApi.getPainting(id))
			Promise.all(request)
				.then(res => {
					const paintings = res.map(responsiveData => responsiveData.data)
					setPaintings(paintings)
					console.log(123)
					setIsLoading(false)
				})
		}
	}, [queryPaintings])

	const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value)
	}

	const handleQueryClick = () => {
		setIsLoading(true)
		paintingsApi.getPaintingsQuery(query)
			.then(paintings => {
				setQueryPaintings(paintings.data)
			})
	}

	return (
		<>
		  <Head>
			<title>Art App</title>
			<meta name="description" content="Generated by create next app" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/favicon.ico" />
		  </Head>
		  <main className={styles.home_page}>
			<div>
				{isLoading ? 
					<Loading /> :
					<div className={styles.container}>
						<div className={styles.title}>
							<h1 className={styles.title1}>Here you can see real Art</h1>
							<h2 className={styles.title2}>We use artworks from Art Institute of Chicago</h2>
						</div>
						<div className={styles.tools}>
							<div className={styles.search_bar}>
								<SearchBar handleQueryChange={handleQueryChange} handleQueryClick={handleQueryClick}/>
							</div>
						</div>
						{paintings[0] ? <Collage paintings={paintings} /> : <></>}		
						<div className={styles.page_controller}>
								<PageController page={page} setPage={setPage} totalPages={pages}/>
						</div>				
					</div>
				}
			</div>
		  </main>
		</>
	)
}

// export async function getStaticProps() {
// 	const response = await fetch('https://api.artic.edu/api/v1/artworks?page=2')
// 	const paintings = await response.json()

// 	if (!paintings) {
// 		return {
// 			notFound: true
// 		}
// 	}

// 	return {
// 		props: {
// 			paintings
// 		},
// 	}
// }