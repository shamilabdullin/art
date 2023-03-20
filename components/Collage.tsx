import { PaintingModel } from '@/types/Paintings';
import React, { useEffect, useState } from 'react'
import styles from "./styles/Collage.module.sass"
import Link from 'next/link'

type CollageProps = {
	paintings: PaintingModel[];
}

export const Collage = ({ paintings }:CollageProps ) => {

	const [collagePaintings, setCollagePaintings] = useState(paintings)

	useEffect(() => {
		setCollagePaintings(paintings)
	}, [paintings])

  return (
	<div>
		{collagePaintings ? 
			<div className={styles.collage}>
				{collagePaintings.map((painting) => (
					<div key={painting.id} className={styles.painting}>
						123
						<Link href={`/paintings/${painting.id}`}>
							<img src={`https://www.artic.edu/iiif/2/${painting.image_id}/full/843,/0/default.jpg`} width={250} className={styles.contain}/>
							<p><strong>{painting.title} {painting.date_end}</strong></p>
							<p>{painting.artist_title}</p>
						</Link>
					</div>
				))}
				111111111111111
			</div>
			:
			<div className={styles.loading}>
				Загрузка
			</div>	
		}
	</div>
  )
}
