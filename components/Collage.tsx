import React, { useEffect, useState } from 'react'

// Stores, utils, libs
import { PaintingModel, PaintingQueryModel } from '@/types/Paintings';
import Link from 'next/link'
import noImg from 'public/no_img.svg'
import Image from 'next/image'

// CSS
import styles from "./styles/Collage.module.sass"

type CollageProps = {
	paintings?: PaintingModel[];
	queryPaintings?: PaintingQueryModel[]; 
}

export const Collage = ({ paintings, queryPaintings }:CollageProps ) => {

	const [collagePaintings, setCollagePaintings] = useState(paintings)

	useEffect(() => {
		setCollagePaintings(paintings)
	}, [paintings])

  return (
	<div>
		{collagePaintings ? 
			<div className={styles.collage}>
				{collagePaintings.map((painting) => (
					painting.image_id === null ?
					<div key={painting.id} className={styles.painting}>
						<Link href={`/paintings/${painting.id}`}>
							<Image src={noImg} width={250} height={300} alt={painting.title} className={styles.contain}/>
							<p><strong>{painting.title} {painting.date_end}</strong></p>
							<p>{painting.artist_title}</p>
						</Link>
					</div> :
					<div key={painting.id} className={styles.painting}>
						<Link href={`/paintings/${painting.id}`}>
							<img src={`https://www.artic.edu/iiif/2/${painting.image_id}/full/843,/0/default.jpg`} width={250} height={300} className={styles.contain}/>
							<p><strong>{painting.title} {painting.date_end}</strong></p>
							<p>{painting.artist_title}</p>
						</Link>
					</div>
				))}
			</div>
			:
			<div className={styles.loading}>
				Загрузка
			</div>	
		}
	</div>
  )
}
