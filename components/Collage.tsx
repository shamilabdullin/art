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

	// const [collagePaintings, setCollagePaintings] = useState(paintings)

	// useEffect(() => {
	// 	setCollagePaintings(paintings)
	// }, [paintings])

  return (
	<div>
		{paintings ? 
			<div className={styles.collage}>
				{paintings.map((painting) => (
					(painting.image_id === null) ?
					<div key={painting.id} className={styles.painting}>
						<Link href={`/paintings/${painting.id}`}>
							<Image src={noImg} alt={painting.title} className={styles.contain}/>
							<div>
								<p><strong>{painting.title} {painting.date_end > 0 ? painting.date_end : `${painting.date_end + painting.date_end * 2} B.C.`}</strong></p>
								<p>{painting.artist_title}</p>
							</div>
						</Link>
					</div> :
					<div key={painting.id} className={styles.painting}>
						<Link href={`/paintings/${painting.id}`}>
							<img src={`https://www.artic.edu/iiif/2/${painting.image_id}/full/843,/0/default.jpg`} className={styles.contain} alt='No image'/>
							<div>
								<p><strong>{painting.title} {painting.date_end > 0 ? painting.date_end : `${painting.date_end + (-painting.date_end * 2)} B.C.`}</strong></p>
								<p>{painting.artist_title}</p>
							</div>
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
