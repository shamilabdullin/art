import React from 'react'

// Stores, utils, libs
import { Pagination } from '@mui/material'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

// CSS
import styles from './styles/PageController.module.sass'

type PageControllerProps = {
  page: string
  setPage: any
  totalPages: string
}

export const PageController = ({
  page,
  setPage,
  totalPages,
}: PageControllerProps): ReactJSXElement => {
  if (Number(totalPages) > 100) {
    totalPages = '100'
  }

  return (
    <Pagination
      page={Number(page)}
      count={Number(totalPages)}
      onChange={(e, value) => setPage(value)}
    />
  )
}
