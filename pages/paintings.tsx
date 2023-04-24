import Link from 'next/link';
import React, { useState } from 'react'
import styles from '../styles/Paintings.module.sass'
import Head from 'next/head';
import PaintingsPage from '@/components/pages/Paintings/PaintingsPage';

const Paintings = () => {

  return (
	<PaintingsPage />
  )
}

export default Paintings;

// export async function getStaticProps() {
// 	const response = await fetch('https://api.artic.edu/api/v1/artworks')
// 	const paintings = await response.json()

// 	if (!paintings) {
// 		return {
// 			notFound: true
// 		}
// 	}

// 	return {
// 		props: {
// 			paintings
// 		},
// 	}
// }