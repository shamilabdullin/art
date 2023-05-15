import React from 'react'
import styles from './Tag.module.sass'
import { useTagStore } from '@/stateManagement/tagStore';
import { Button } from '@mui/material';

type TagProps = {
	style_id: string;
	style_title: string
}
 
export const Tag = ({style_id, style_title}: TagProps) => {

	const setTag = useTagStore(state => state.setTag)

	const handleClick = () => {
		setTag(style_id)
	}

  return (
	<Button 
		onClick={handleClick} 
		className={styles.button_style}
		size='small'
	>
		<div className={styles.button_title}>
			{style_title.toUpperCase()}
		</div>
	</Button>
  )
}
