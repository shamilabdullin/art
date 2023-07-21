import React from 'react'

// Stores, utils, libs
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import Link from 'next/link'
import classNames from 'classnames'

// CSS
import styles from './styles/SearchBar.module.sass'

type SearchBarProps = {
	handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
	handleQueryClick: (e: any) => void,
	textFieldBackgroundColor?: string,
	buttonBackgroundColor?: 'white' | 'black',
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

	return (
		<div>{addLink ?
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
								backgroundColor: '#dac6e3',
								color: 'black'
							}
						}}
					>
						Search
					</Button>
				</form>
			</div> :
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
							backgroundColor: '#9e8fa5',
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
