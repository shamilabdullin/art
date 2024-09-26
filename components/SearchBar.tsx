import React from 'react'

// Components
import { Button } from '@mui/material'

// Stores, utils, libs
import classNames from 'classnames'
import { useQueryStore } from '@/stateManagement/queryStore'

// CSS
import styles from './styles/SearchBar.module.sass'

type SearchBarProps = {
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleQueryClick: (e: any) => void
  textFieldBackgroundColor?: string
  buttonBackgroundColor?: 'white' | 'black' | string
  searchBarLength?: string
  addLink?: boolean
  placeholder?: string
  formClass?: string
  inputClass?: string
  buttonClass?: string
}

export const SearchBar = ({
  handleQueryChange,
  handleQueryClick,
  buttonBackgroundColor,
  addLink,
  placeholder,
  formClass,
  inputClass,
  buttonClass,
}: SearchBarProps) => {
  const query = useQueryStore((state) => state.query)

  return (
    <div>
      {addLink ? (
        <form onSubmit={handleQueryClick} className={formClass}>
          <input
            className={classNames(styles.text_field, inputClass)}
            onChange={handleQueryChange}
            placeholder={placeholder}
            value={query}
          />
          <Button
            size="large"
            onClick={handleQueryClick}
            type="button"
            variant="contained"
            className={buttonClass}
            sx={{
              backgroundColor: buttonBackgroundColor,
              border: '2px solid white',
              marginLeft: '5px',
              '&:hover': {
                backgroundColor: '#261f27',
                transition: 'all 0.3s ease',
                opacity: '0.8',
              },
            }}
          >
            Search
          </Button>
        </form>
      ) : (
        <div>
          <form onSubmit={handleQueryClick} className={formClass}>
            <input
              className={classNames(styles.text_field, inputClass)}
              onChange={handleQueryChange}
              placeholder={placeholder}
            />
            <Button
              size="medium"
              onClick={handleQueryClick}
              type="button"
              variant="contained"
              className={buttonClass}
              sx={{
                backgroundColor: buttonBackgroundColor,
                border: '2px solid white',
                marginLeft: '5px',
                '&:hover': {
                  backgroundColor: '#261f27',
                  opacity: '0.8',
                  transition: 'all 0.3s ease',
                },
              }}
            >
              Search
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}
