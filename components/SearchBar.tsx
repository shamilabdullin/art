import React from 'react'

// Stores, utils, libs
import { TextField } from '@mui/material'
import { Button } from '@mui/material'

// CSS
import styles from './styles/SearchBar.module.sass'
import Link from 'next/link'

type SearchBarProps = {
	handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
	handleQueryClick: (e: any) => void,
	textFieldBackgroundColor?: string,
	buttonBackgroundColor?: 'white' | 'black',
	searchBarLength?: string,
	addLink?: boolean,
}

export const SearchBar = ({
	handleQueryChange, 
	handleQueryClick, 
	textFieldBackgroundColor, 
	buttonBackgroundColor, 
	searchBarLength,
	addLink
}: SearchBarProps) => {
  return (
	<div>{addLink ?
		<div>
			<form onSubmit={handleQueryClick}>
				<input
					className={styles.text_field}
					// size='small'
					onChange={handleQueryChange}
					style={{
						'backgroundColor' : textFieldBackgroundColor,
						'width' : `${searchBarLength}px`
					}}
					// sx={{
					// 	borderRadius: '0px',
					// 	backgroundColor: textFieldBackgroundColor,
					// 	"&:focus" : {
					// 		color: 'green'
					// 	}
					// }}
					// variant='standard'
					// color='info'
				/>
				<Button 
					size='large' 
					onClick={handleQueryClick}
					type='button'
					variant='contained'
					sx={{
						backgroundColor: buttonBackgroundColor,
						border: '2px solid white',
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
		</div> :
		<div>
			<form onSubmit={handleQueryClick}>
			<input
				className={styles.text_field}
				// size='small'
				onChange={handleQueryChange}
				style={{
					'backgroundColor' : textFieldBackgroundColor,
					'width' : `${searchBarLength}px`
				}}
				// sx={{
				// 	borderRadius: '0px',
				// 	backgroundColor: textFieldBackgroundColor,
				// 	"&:focus" : {
				// 		color: 'green'
				// 	}
				// }}
				// variant='standard'
				// color='info'
			/>
			<Button 
				size='large' 
				onClick={handleQueryClick}
				type='button'
				variant='contained'
				sx={{
					backgroundColor: buttonBackgroundColor,
					border: '2px solid white',
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
	}
	</div>
  )
}
