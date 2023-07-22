import { useEffect, useState } from "react"

// Components
import { Loading } from "@/components/Loading"

// Stores, utils, libs
import { useRouter } from "next/router"
import { PaintingModel } from '@/types/Paintings'
import { paintingsApi } from "@/api/paintings"
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

export default function Painting():JSX.Element {

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
			<div className={styles.container}>
				<div className={styles.painting}>
					{isLoading ?
						<Loading />
						:
						<>
							<div className={styles.main}>
								<div className={styles.title}>
									<h1>{painting.title}</h1>
								</div>
								{(painting.image_id)  ? 
									<img src={`https://www.artic.edu/iiif/2/${painting.image_id}/full/843,/0/default.jpg`} className={styles.paintingImg} alt='No image'></img>
									:
									<Image src={noImg} height={"790"} className={styles.paintingImg} alt={painting.title} /> 
								}
								{painting.date_end > 0?
									<h3 className={styles.dates}>{(painting.date_start && painting.date_end) ? painting.date_start + ' - ' + painting.date_end : 'No date' }</h3> :
									<h3 className={styles.dates}>{(painting.date_start && painting.date_end) ? `${painting.date_start + (-painting.date_start * 2)} B.C.` + ' - ' + `${painting.date_end + (-painting.date_end * 2)} B.C.` : 'No date' }</h3>
								}
								<h3 className={styles.author}>
									{painting.artist_title}
								</h3>
							</div>
							<div className={styles.description}>
								<dl className={styles.description_table}>
									<dt><h4>Artist</h4></dt>
									<dd><span>{painting.artist_title ? 
											<Link href={`/artists/${painting.artist_id}`} onClick={(e) => addCurrentArtist(e.currentTarget.text)} className={styles.link}>{painting.artist_title}</Link> 
											: 
											'-'
										}
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
						</>
					}
				</div>
			</div>	
		</div>
	)
};