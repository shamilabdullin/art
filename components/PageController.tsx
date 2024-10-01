import React, { useCallback, useMemo } from 'react'

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

const PageController = ({ page, setPage, totalPages }: PageControllerProps): ReactJSXElement => {
  if (Number(totalPages) > 100) {
    totalPages = '100'
  }

  const totalPagesMemoized = useMemo(() => {
    if (Number(totalPages) > 100) return 100
    return Number(totalPages)
  }, [totalPages])

  const pageMemoized = useMemo(() => {
    return Number(page)
  }, [page])

  const onChange = useCallback(
    (e: React.ChangeEvent<unknown>, value: number) => {
      setPage(value)
    },
    [setPage],
  )

  return <Pagination page={pageMemoized} count={totalPagesMemoized} onChange={onChange} />
}

export const MemoizedPageController = React.memo(PageController)
