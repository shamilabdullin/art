import React from 'react'

// Components
import { Header } from './Header'

export const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
