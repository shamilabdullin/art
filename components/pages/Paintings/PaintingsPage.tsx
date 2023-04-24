import React, { useEffect, useState } from 'react'
import styles from './PaintingsPage.module.sass'
import Head from 'next/head';
import Link from 'next/link';
import { paintingsApi } from '@/api/paintings';
import loading from '../../../public/loading.json'
import Lottie from "lottie-react"
import { PageController } from '@/components/PageController';

const PaintingsPage: React.FC = () => {

	const [paintings, setPaintings] = useState([])
	const [pages, setPages] = useState('1')
	const [currentPage, setCurrentPage] = useState('1') 
	const [isLoading, setIsLoading] = useState(false)

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
