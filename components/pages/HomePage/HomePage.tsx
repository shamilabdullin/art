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
import { useQueryStore } from '@/stateManagement/queryStore'

// CSS
import styles from './Home.module.sass'
import { TagContainer } from '@/components/tags/TagContainer'
import { useTagStore } from '@/stateManagement/tagStore'

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

export default function HomePage():JSX.Element { 

	const [paintings, setPaintings] = useState <PaintingModel[]> ([]);
	const [currentPage, setCurrentPage] = useState('1')
	const [isLoading, setIsLoading] = useState(false)
	const [queryPaintings, setQueryPaintings] = useState([queryPainting])
	const [pages, setPages] = useState('1')
	// const [query, setQuery] = useState('')
	// const [isQuerySend, setIsQuerySend] = useState(false)
	const query = useQueryStore(state => state.query)
	const setQuery = useQueryStore(state => state.setQuery)

	const isQuerySend = useQueryStore(state => state.isSend)
	const setIsQuerySend = useQueryStore(state => state.setIsSend)

	const tag = useTagStore(state => state.tag)
	const setTag = useTagStore(state => state.setTag)

	useEffect(() => {
		if (tag === '') {
			setIsLoading(true)
			paintingsApi.getPaintingsQuery(query, currentPage)
			.then(res => {
				setQueryPaintings(res.data)
				if (res.pagination) {
					setPages(res.pagination.total_pages)
					if (currentPage > res.pagination.total_pages) {
						setCurrentPage('1')
					}
				}
				if (res.data.length === 0) setIsLoading(false)
			})
		}
			return () => {
				setIsQuerySend(false)
			}
	}, [currentPage, isQuerySend])

	useEffect(() => {
		if (tag !== '') {
			setIsLoading(true)
			paintingsApi.postPaintingsStyle(tag, currentPage)   // будут баги с currentPage
			.then(res => {
				setQueryPaintings(res.data)
				if (res.pagination) {
					setPages(res.pagination.total_pages)
					if (currentPage > res.pagination.total_pages) {
						setCurrentPage('1')
					}
				}
				if (res.data.length === 0) setIsLoading(false)
			})
			return () => {
				setIsQuerySend(false)
				setTag('')
			}
		}
	}, [tag, currentPage])
		

	useEffect(() => {
		if (queryPaintings.length > 1) {
			setIsLoading(true)
			const ids = queryPaintings.map(queryPainting => queryPainting.id)
			const request = ids.map(id => paintingsApi.getPainting(id))
			Promise.all(request)
				.then(res => {
					const paintings = res.map(responsiveData => responsiveData.data)
					setPaintings(paintings)
					setIsLoading(false)
				})
		}
	}, [queryPaintings])

	const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value)
	}

	const handleQueryClick = (e: React.SyntheticEvent) => {
		e.preventDefault()
		setIsQuerySend(!isQuerySend)
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
							<h1 className={styles.title1}>Find your favourite paintings here</h1>
							{/* <h2 className={styles.title2}>We use artworks from Art Institute of Chicago</h2> */}
						</div>
						<div className={styles.tools}>
							<div className={styles.search_bar}>
								<SearchBar 
									handleQueryChange={handleQueryChange} 
									handleQueryClick={handleQueryClick}
									textFieldBackgroundColor='white'
									buttonBackgroundColor='black'
									searchBarLength='180'
									placeholder='keywords'
								/>
							</div>
						</div>
						<div className={styles.tags}>
							<TagContainer />
						</div>
						{paintings[0] ? <div className={styles.collage}><Collage paintings={paintings} /></div> : <></>}		
						<div className={styles.page_controller}>
								<PageController page={currentPage} setPage={setCurrentPage} totalPages={pages}/>
						</div>				
					</div>
				}
			</div>
		  </main>
		</>
	)
}

// const painting: PaintingModel = {
// 	id: 0,
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