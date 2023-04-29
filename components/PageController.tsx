import React, { SetStateAction } from 'react'

// Stores, utils, libs
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

// CSS
import styles from './styles/PageController.module.sass'

type PageControllerProps = {
	page: string;
	setPage: any;
	totalPages: string;
}

export const PageController = ({page, setPage, totalPages}: PageControllerProps): ReactJSXElement => {

	let pages = Number(totalPages)
	if (pages > 100) {
		pages = 100
	}
	const array = []
	for (let i = 0; i < pages; i++) {
		array.push(i + 1)
	}

	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
		  style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		  }
		}
	};

  return (
	<FormControl className={styles.formControl}>
		<InputLabel id="demo-simple-select-label">Page</InputLabel>
		<Select
			labelId="demo-simple-select-label"
			id="demo-simple-select"
			value={page}
			label="Page"
			onChange={e => setPage(e.target.value)}
			MenuProps={MenuProps}
			maxRows={1000}
			multiline={true}
		>
			{/* <MenuItem value={'1'}>1</MenuItem> */}
			{array.map(menuItem => (
				<MenuItem value={String(menuItem)} key={menuItem}>{menuItem}</MenuItem>
			))}
		</Select>
	</FormControl>
  )
}
