import React from 'react'

// Stores, utils, libs
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import Link from 'next/link'
import classNames from 'classnames'

// CSS
import styles from './styles/SearchBar.module.sass'
import { useQueryStore } from '@/stateManagement/queryStore'

type SearchBarProps = {
	handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
	handleQueryClick: (e: any) => void,
	textFieldBackgroundColor?: string,
	buttonBackgroundColor?: 'white' | 'black' | string, 
	searchBarLength?: string,
	addLink?: boolean,
	placeholder?: string,
	formClass?: string,
	inputClass?: string,
	buttonClass?: string,
}

export const SearchBar = ({
	handleQueryChange, 
	handleQueryClick, 
	textFieldBackgroundColor, 
	buttonBackgroundColor, 
	searchBarLength,
	addLink,
	placeholder,
	formClass,
	inputClass,
	buttonClass
}: SearchBarProps) => {

	const query = useQueryStore(state => state.query)

	return (
		<div>{addLink ?
			<form 
				onSubmit={handleQueryClick}
				className={formClass}
			>
				<input
					className={classNames(styles.text_field, inputClass)}
					// size='small'
					onChange={handleQueryChange}
					// style={{
					// 	'backgroundColor' : textFieldBackgroundColor,
					// 	'width' : `${searchBarLength}px`
					// }}
					// sx={{
					// 	borderRadius: '0px',
					// 	backgroundColor: textFieldBackgroundColor,
					// 	"&:focus" : {
					// 		color: 'green'
					// 	}
					// }}
					// variant='standard'
					// color='info'
					placeholder={placeholder}
					value={query}
				/>
				<Button 
					size='large' 
					onClick={handleQueryClick}
					type='button'
					variant='contained'
					className={buttonClass}
					sx={{
						backgroundColor: buttonBackgroundColor,
						border: '2px solid white',
						marginLeft: '5px',
						"&:hover" : {
							backgroundColor: '#261f27', // #dac6e3
							// color: 'black',
							transition: 'all 0.3s ease',
							opacity: '0.8'
						}
					}}
				>
					Search
				</Button>
			</form> :
			<div>
				<form 
					onSubmit={handleQueryClick} 
					className={formClass}
				>
				<input
					className={classNames(styles.text_field, inputClass)}
					// size='small'
					onChange={handleQueryChange}
					// style={{
					// 	'backgroundColor' : textFieldBackgroundColor,
					// 	'width' : `${searchBarLength}px`
					// }}
					// sx={{
					// 	borderRadius: '0px',
					// 	backgroundColor: textFieldBackgroundColor,
					// 	"&:focus" : {
					// 		color: 'green'
					// 	}
					// }}
					// variant='standard'
					// color='info'
					placeholder={placeholder}
				/>
				<Button 
					size='medium' 
					onClick={handleQueryClick}
					type='button'
					variant='contained'
					className={buttonClass}
					sx={{
						backgroundColor: buttonBackgroundColor,
						border: '2px solid white',
						marginLeft: '5px',
						"&:hover" : {
							backgroundColor: '#261f27',
							// color: 'black',
							opacity: '0.8',
							transition: 'all 0.3s ease'
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
