import React from 'react'

// Components
import { Footer } from './Footer'
import { Header } from './Header'

export const Layout = ({ children }: any) => {
  return (
	<>
		<Header />
			{children}
		<Footer />
	</>
  )
}
