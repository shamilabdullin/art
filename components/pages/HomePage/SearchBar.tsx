import React from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField, } from '@mui/material'
import { Button } from '@mui/material'

type SearchBarProps = {
	handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
	handleQueryClick: (e: any) => void
}

export const SearchBar = ({handleQueryChange, handleQueryClick}: SearchBarProps) => {
  return (
	<div>
		<FormControl>
			<TextField 
				size='small'
				variant='outlined'
				onChange={handleQueryChange}
			/>
		</FormControl>
		<Button 
			size='large' 
			onClick={handleQueryClick}
			type='button'
		>
			Search
		</Button>
	</div>
  )
}
