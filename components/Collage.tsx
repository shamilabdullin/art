import { Painting } from '@/types/Paintings';
import React from 'react'
import styles from "./styles/Collage.module.sass"
import Link from 'next/link'

type CollageProps = {
	paintings: Painting[];
}

export const Collage = ({ paintings }:CollageProps ) => {
  return (
	<div className={styles.collage}>
		{paintings.map((painting) => (
			<div key={painting.id} className={styles.painting}>
				<Link href={`/paintings/${painting.id}`}>
					<img src={`https://www.artic.edu/iiif/2/${painting.image_id}/full/843,/0/default.jpg`} width={250} className={styles.contain}/>
				</Link>
			</div>
		))}
	</div>
  )
}
