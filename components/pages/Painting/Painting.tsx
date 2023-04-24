import { useRouter } from "next/router"
import styles from './Painting.module.sass'
import Image from 'next/image'
import { useEffect, useMemo, useState } from "react"
import { PaintingModel } from '@/types/Paintings'
import { paintingsApi } from "@/api/paintings"
import loading from '../../../public/loading1.json'
import Lottie from "lottie-react"

const emptyPainting: PaintingModel = {
	id: 0,
	title: '',
	image_id: '',
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

export default function Painting() {

	const [painting, setPainting] = useState(emptyPainting)
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	useEffect(() => {
		if (router.asPath !== router.route) {
			if (typeof router.query.id === 'string') {
				setIsLoading(true)
				paintingsApi.getPainting(router.query.id)    // ?fields=id,title,image_id,date_start,date_end
					.then(painting => {
						setPainting(painting.data)
						setIsLoading(false)	
					})
			}
		  }
	}, [router])

	return (
		<div className={styles.paintingPage}>
			{isLoading ? 
			<div className={styles.loadingContainer}>
				<div className={styles.loading}><Lottie animationData={loading} /></div>
			</div> : 
			<div className={styles.container}>
			<div className={styles.painting}>
				<div className={styles.main}>
					<div className={styles.title}>
						<h1>{painting.title}</h1>
					</div>
					<img src={`https://www.artic.edu/iiif/2/${painting.image_id}/full/843,/0/default.jpg`} height={"500"} className={styles.paintingImg}></img>
					<p className={styles.dates}>{painting.date_start} - {painting.date_end}</p>
					<p className={styles.author}>{painting.artist_title}</p>
				</div>
				<div className={styles.description}>
					<dl className={styles.description_table}>
						<dt><h4>Artist</h4></dt>
						<dd><span>{painting.artist_title}</span></dd>
						<dt><h4>Title</h4></dt>
						<dd><span>{painting.title}</span></dd>
						<dt><h4>Place</h4></dt>
						<dd><span>{painting.place_of_origin}</span></dd>
						<dt><h4>Date</h4></dt>
						<dd><span>{painting.date_end}</span></dd>
						<dt><h4>Medium</h4></dt>
						<dd><span>{painting.medium_display}</span></dd>
					</dl>
				</div>
			</div>
		</div>	
		}
		</div>
	)
};

/* <Image src={`https://www.artic.edu/iiif/2/${painting.data.image_id}/full/843,/0/default.jpg`} width={600} height={800} alt='painting'/> */

// export const getServerSideProps = async (context: any) => {
// 	const { id } = context.params
// 	// const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`)
// 	const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,image_id`)
// 	const painting = await response.json()

// 	if (!painting) {
// 		return {
// 			notFound: true
// 		}
// 	}

// 	return {
// 		props: {
// 			painting
// 		},
// 	}
// }