import React from 'react'

// Stores, utils, libs
import { TextField } from '@mui/material'
import { Button } from '@mui/material'

type SearchBarProps = {
	handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
	handleQueryClick: (e: any) => void
}

export const SearchBar = ({handleQueryChange, handleQueryClick}: SearchBarProps) => {
  return (
	<div>
		<form onSubmit={handleQueryClick}>
			<TextField 
				size='small'
				onChange={handleQueryChange}
				sx={{
					"&:focus" : {
						color: 'red'
					}
				}}
			/>
			<Button 
				size='large' 
				onClick={handleQueryClick}
				type='button'
				variant='contained'
				sx={{
					backgroundColor: 'black',
					marginLeft: '5px',
					"&:hover" : {
						backgroundColor: 'grey',
						color: 'black'
					}
				}}
			>
				Search
			</Button>
		</form>
	</div>
  )
}
