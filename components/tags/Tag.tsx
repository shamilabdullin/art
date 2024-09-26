import React from 'react'
import styles from './Tag.module.sass'
import { useTagStore } from '@/stateManagement/tagStore'
import { Button } from '@mui/material'
import { useQueryStore } from '@/stateManagement/queryStore'

type TagProps = {
  style_id: string
  style_title: string
}

export const Tag = ({ style_id, style_title }: TagProps) => {
  const setTag = useTagStore((state) => state.setTag)
  const tag = useTagStore((state) => state.tag)
  const setQuery = useQueryStore((state) => state.setQuery)

  const setIsTagPressed = useTagStore((state) => state.setIsTagPressed)

  const handleClick = () => {
    setTag(style_id)
    setIsTagPressed(!tag)
    setQuery('')
  }

  return (
    <>
      {tag === style_id ? (
        <Button
          onClick={handleClick}
          className={styles.button_style}
          size="small"
          sx={{
            margin: '4px',
            backgroundColor: '#261f27',
            '&:hover': {
              backgroundColor: '#261f27',
              transition: 'all 0.3s ease',
            },
          }}
        >
          <div className={styles.button_title_active}>{style_title.toUpperCase()}</div>
        </Button>
      ) : (
        <Button
          onClick={handleClick}
          className={styles.button_style}
          size="small"
          sx={{
            margin: '4px',
            backgroundColor: '#dac6e3',
            '&:hover': {
              backgroundColor: '#261f27',
              transition: 'all 0.3s ease',
            },
          }}
        >
          <div className={styles.button_title}>{style_title.toUpperCase()}</div>
        </Button>
      )}
    </>
  )
}
