import React from 'react'
import { Tag } from './Tag'

export const TagContainer = () => {
  const tags = [
    {
      style_id: 'TM-7547',
      style_title: 'Post-Impressionism',
    },
    {
      style_id: 'TM-7543',
      style_title: 'Impressionism',
    },
    {
      style_id: 'TM-5891',
      style_title: 'Renaissance',
    },
    {
      style_id: 'TM-5981',
      style_title: 'Modernism',
    },
    {
      style_id: 'TM-5895',
      style_title: 'Rococo',
    },
    {
      style_id: 'TM-13203',
      style_title: '19th century',
    },
  ]

  return (
    <div>
      {tags.map((tag) => (
        <Tag key={tag.style_id} style_id={tag.style_id} style_title={tag.style_title} />
      ))}
    </div>
  )
}
