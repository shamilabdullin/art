import { useEffect, useState } from "react"

// Stores, utils, libs
import { useRouter } from "next/router"
import { PaintingModel } from '@/types/Paintings'
import { paintingsApi } from "@/api/paintings"
import loading from '../../../public/loading1.json'
import Lottie from "lottie-react"
import noImg from 'public/no_img.svg'
import Image from 'next/image'
import Link from "next/link"
import { useArtistStore } from "@/stateManagement/artistsStore"

// CSS
import styles from './Painting.module.sass'

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
	const addCurrentArtist = useArtistStore(state => state.addCurrentArtist)

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
					{painting.image_id ? 
						<img src={`https://www.artic.edu/iiif/2/${painting.image_id}/full/843,/0/default.jpg`} height={"500"} className={styles.paintingImg}></img>
						:
						<Image src={noImg} height={"500"} className={styles.paintingImg} alt={painting.title} /> 
					}
					<h3 className={styles.dates}>{(painting.date_start && painting.date_end) ? painting.date_start + ' - ' + painting.date_end : 'No date' }</h3>
					<h3 className={styles.author}>
						<Link href={`/artists/${painting.artist_id}`} onClick={(e) => addCurrentArtist(e.currentTarget.text)}>{painting.artist_title}</Link>
					</h3>
				</div>
				<div className={styles.description}>
					<dl className={styles.description_table}>
						<dt><h4>Artist</h4></dt>
						<dd><span>{painting.artist_title ? 
							<Link href={`/artists/${painting.artist_id}`} onClick={(e) => addCurrentArtist(e.currentTarget.text)}>{painting.artist_title}</Link> : '-'}
						</span></dd>
						<dt><h4>Title</h4></dt>
						<dd><span>{painting.title ? painting.title : '-'}</span></dd>
						<dt><h4>Place</h4></dt>
						<dd><span>{painting.place_of_origin ? painting.place_of_origin : '-'}</span></dd>
						<dt><h4>Date</h4></dt>
						<dd><span>{painting.date_end ?? '-'}</span></dd>
						<dt><h4>Medium</h4></dt>
						<dd><span>{painting.medium_display ?? '-'}</span></dd>
						<dt><h4>Dimensions</h4></dt>
						<dd><span>{painting.dimensions ?? '-'}</span></dd>
						<dt><h4>Credit line</h4></dt>
						<dd><span>{painting.credit_line ?? '-'}</span></dd>
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