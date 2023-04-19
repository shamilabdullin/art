import React, { SetStateAction } from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField, } from '@mui/material'
import styles from './Home.module.sass'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

type PageControllerProps = {
	page: string;
	setPage: (value: SetStateAction<string>) => void;
}

export const PageController = ({page, setPage}: PageControllerProps): ReactJSXElement => {
  return (
	<FormControl className={styles.formControl}>
		<InputLabel id="demo-simple-select-label">Page</InputLabel>
		<Select
			labelId="demo-simple-select-label"
			id="demo-simple-select"
			value={page}
			label="Page"
			onChange={e => setPage(e.target.value)}
		>
			<MenuItem value={'1'}>1</MenuItem>
			<MenuItem value={'2'}>2</MenuItem>
			<MenuItem value={'3'}>3</MenuItem>
			<MenuItem value={'4'}>4</MenuItem>
			<MenuItem value={'5'}>5</MenuItem>
			<MenuItem value={'6'}>6</MenuItem>
			<MenuItem value={'666'}>666</MenuItem>
		</Select>
	</FormControl>
  )
}
