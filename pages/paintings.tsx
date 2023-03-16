import Link from 'next/link';
import React, { useState } from 'react'
import styles from '../styles/Paintings.module.sass'
import Head from 'next/head';

export async function getStaticProps() {
	const response = await fetch('https://api.artic.edu/api/v1/artworks')
	const paintings = await response.json()

	if (!paintings) {
		return {
			notFound: true
		}
	}

	return {
		props: {
			paintings
		},
	}
}

const Paintings = ({ paintings }:any) => {

	const data = paintings.data
	// console.log(data)

  return (
	<div className={styles.paintings_page}>
		<Head>
			<title>Paintings</title>
		</Head>
		<div className={styles.paintings_title}>
			<h1>Paintings</h1>
		</div>
		<ul>
			{data.map((painting: any) => 
				<li key={painting.id}>
					<Link href={`/paintings/${painting.id}`}>
						{painting.title}
					</Link>
				</li>
			)}
		</ul>
	</div>
  )
}

export default Paintings;