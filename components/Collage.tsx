// Stores, utils, libs
import React, { useEffect, useState } from 'react'
import { PaintingModel, PaintingQueryModel } from '@/types/Paintings'
import Link from 'next/link'
import noImg from 'public/no_img.svg'
import Image from 'next/image'
import { useQueryStore } from '@/stateManagement/queryStore'

// CSS
import styles from './styles/Collage.module.sass'

type CollageProps = {
  paintings?: PaintingModel[]
  queryPaintings?: PaintingQueryModel[]
}

export const Collage = ({ paintings, queryPaintings }: CollageProps) => {
  const setQuery = useQueryStore((state) => state.setQuery)

  return (
    <>
      {paintings ? (
        <div className={styles.collage}>
          {paintings.map((painting) =>
            painting.image_id === null ? (
              <Link
                href={`/paintings/${painting.id}`}
                key={painting.id}
                className={styles.painting}
                onClick={() => setQuery('')}
              >
                <Image src={noImg} alt={painting.title} className={styles.no_img} />
                <div>
                  <p className={styles.painting_title}>
                    <strong>{painting.title}</strong>
                  </p>{' '}
                  {/* {painting.date_end > 0 ? painting.date_end : `${painting.date_end + painting.date_end * 2} B.C.`} */}
                  <p>{painting.artist_title}</p>
                </div>
              </Link>
            ) : (
              <Link
                href={`/paintings/${painting.id}`}
                key={painting.id}
                className={styles.painting}
                onClick={() => setQuery('')}
              >
                <img
                  src={`https://www.artic.edu/iiif/2/${painting.image_id}/full/843,/0/default.jpg`}
                  className={styles.contain}
                  alt="No image"
                />
                <div>
                  <p className={styles.painting_title}>
                    <strong>{painting.title}</strong>
                  </p>{' '}
                  {/* {painting.date_end > 0 ? painting.date_end : `${painting.date_end + painting.date_end * 2} B.C.`} */}
                  <p>{painting.artist_title}</p>
                </div>
              </Link>
            ),
          )}
        </div>
      ) : (
        <div className={styles.loading}>Загрузка</div>
      )}
    </>
  )
}
