import React, { useEffect, useState } from 'react'

// Components
import { PageController } from '@/components/PageController';
import { SearchBar } from '@/components/SearchBar';
import { Loading } from '@/components/Loading';

// Stores, utils, libs
import Head from 'next/head';
import Link from 'next/link';
import { paintingsApi } from '@/api/paintings';
import { PaintingQueryModel } from '@/types/Paintings';
import { useQueryStore } from '@/stateManagement/queryStore';
import { useRouter } from 'next/router';

// CSS
import styles from './PaintingsPage.module.sass'

const PaintingsPage: React.FC = () => {

	const [paintings, setPaintings] = useState<PaintingQueryModel[]>([])
	const [pages, setPages] = useState('1')
	const [currentPage, setCurrentPage] = useState('1') 
	const [isLoading, setIsLoading] = useState(false)
	const [query, setQuery] = useState('')
	const [isQuerySend, setIsQuerySend] = useState(false)
	// const isHeaderQuerySend = useQueryStore(state => state.isSend)
	// const router = useRouter()
	// const [queryPaintings, setQueryPaintings] = useState<PaintingQueryModel[]>([]) 

	useEffect(() => {
		setIsLoading(true)
		paintingsApi.getPaintingsQuery(query, currentPage)
			.then(res => {
				setPaintings(res.data)
				if (res.pagination) {
					setPages(res.pagination?.total_pages)
				}
			})
			.then(() => setIsLoading(false))
	}, [currentPage, isQuerySend])

	// useEffect(() => {
	// 	if (isHeaderQuerySend) router.push('/')
	// }, [isHeaderQuerySend])

	const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value)
	}

	const handleQueryClick = (e: React.SyntheticEvent) => { // React.FormEvent<HTMLFormElement>
		e.preventDefault()
		setIsQuerySend(!isQuerySend)
	}

	return (
		<div>
			{isLoading ? 
				<Loading /> :
				<div className={styles.paintings_page}>
					<div className={styles.content}>
						<Head>
							<title>Paintings</title>
						</Head>
						<div className={styles.paintings_title}>
							<h1>Find your painting</h1>
						</div>
						<ul>
							{paintings.map((painting: any) => 
								<li key={painting.id} className={styles.painting}>
									<Link href={`/paintings/${painting.id}`} className={styles.painting_link}>
										{painting.title}
									</Link>
								</li>
							)}
						</ul>
						<div className={styles.search_bar}>
							<SearchBar 
								handleQueryChange={handleQueryChange} 
								handleQueryClick={handleQueryClick}
								buttonBackgroundColor='black'
								searchBarLength='300'
								addLink={false}
								placeholder={'painting title'}
								inputClass={styles.search_bar_input}
								buttonClass={styles.search_bar_button}
							/>	
						</div>
						<div className={styles.page_controller}>
							<PageController page={currentPage} totalPages={pages} setPage={setCurrentPage}/>
						</div>
					</div>
				</div>
			}
		</div>
	)
}

export default PaintingsPage


// useEffect(() => {
// 	if (queryPaintings.length > 1) {
// 		setIsLoading(true)
// 		let ids = queryPaintings.map(queryPainting => queryPainting.id)
// 		let requests = ids.map(id => paintingsApi.getPainting(id))
// 		Promise.all(requests)
// 			.then(res => {
// 				const paintings = res.map(responsiveData => responsiveData.data)
// 				setPaintings(paintings)
// 				setIsLoading(false)
// 			})
// 	}
// }, [queryPaintings])