import { useRouter } from "next/router"
import styles from './Painting.module.sass'
import Image from 'next/image'
import { useEffect, useMemo, useState } from "react"
import { PaintingModel } from '@/types/Paintings'

const emptyPainting: PaintingModel = {
	id: 0,
	title: '',
	image_id: 0,
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
	publication_history: ''
}

export default function Painting() {

	const [painting, setPainting] = useState(emptyPainting)
	const router = useRouter()

	useEffect(() => {
		if (router.asPath !== router.route) {
			fetch(`https://api.artic.edu/api/v1/artworks/${router.query.id}?fields=id,title,image_id`)
			.then(response => response.json())
			.then(response => setPainting(response.data))
		  }
	}, [router])

	return (
		<div className={styles.painting}>
			<div className={styles.title}>
				<h1>{painting.title}</h1>
			</div>
			<img src={`https://www.artic.edu/iiif/2/${painting.image_id}/full/843,/0/default.jpg`} height={"500"} ></img>
			{/* <Image src={`https://www.artic.edu/iiif/2/${painting.data.image_id}/full/843,/0/default.jpg`} width={600} height={800} alt='painting'/> */}
		</div>
	)
};

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