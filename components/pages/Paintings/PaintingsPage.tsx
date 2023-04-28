import React, { useEffect, useState } from 'react'

// Components
import { PageController } from '@/components/PageController';
import { SearchBar } from '@/components/SearchBar';

// Stores, utils, libs
import Head from 'next/head';
import Link from 'next/link';
import { paintingsApi } from '@/api/paintings';
import loading from '../../../public/loading.json'
import Lottie from "lottie-react"
import { PaintingModel, PaintingQueryModel } from '@/types/Paintings';

// CSS
import styles from './PaintingsPage.module.sass'

const PaintingsPage: React.FC = () => {

	const [paintings, setPaintings] = useState<PaintingModel[]>([])
	const [pages, setPages] = useState('1')
	const [currentPage, setCurrentPage] = useState('1') 
	const [isLoading, setIsLoading] = useState(false)
	const [query, setQuery] = useState('')
	const [queryPaintings, setQueryPaintings] = useState<PaintingQueryModel[]>([])

	useEffect(() => {
		setIsLoading(true)
		paintingsApi.getPaintings(currentPage)
			.then(res => {
				setPaintings(res.data)
				if (res.pagination) {
					setPages(res.pagination?.total_pages)
				}
			})
			.then(() => setIsLoading(false))
	}, [currentPage])

	useEffect(() => {
		if (queryPaintings.length > 1) {
			setIsLoading(true)
			let ids = queryPaintings.map(queryPainting => queryPainting.id)
			let requests = ids.map(id => paintingsApi.getPainting(id))
			Promise.all(requests)
				.then(res => {
					const paintings = res.map(responsiveData => responsiveData.data)
					setPaintings(paintings)
					setIsLoading(false)
				})
		}
	}, [queryPaintings])

	const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value)
	}

	const handleQueryClick = () => {
		setIsLoading(true)
		paintingsApi.getPaintingsQuery(query)
		.then(paintings => {
			setQueryPaintings(paintings.data)
		})
		.then(() => setIsLoading(false))
	}

	return (
		<div>
			{isLoading ? 
				<div className={styles.loadingContainer}>
					<div className={styles.loading}>
						<Lottie animationData={loading}></Lottie>
					</div>
				</div> :
				<div className={styles.paintings_page}>
					<div className={styles.content}>
						<Head>
							<title>Paintings</title>
						</Head>
						<div className={styles.paintings_title}>
							<h1>Paintings</h1>
						</div>
						<ul>
							{paintings.map((painting: any) => 
								<li key={painting.id}>
									<Link href={`/paintings/${painting.id}`} className={styles.painting}>
										{painting.title}
									</Link>
								</li>
							)}
						</ul>
						<div className={styles.search_bar}>
							<SearchBar handleQueryChange={handleQueryChange} handleQueryClick={handleQueryClick}/>	
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
