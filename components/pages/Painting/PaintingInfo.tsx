import React from 'react'

// Components
import Image from 'next/image'
import Link from 'next/link'

// Stores, utils, libs
import noImg from 'public/no_img.svg'
import { PaintingModel } from '@/types/Paintings'
import { useArtistStore } from '@/stateManagement/artistsStore'

// CSS
import styles from './Painting.module.sass'

type PaintingInfoProps = {
  painting: PaintingModel
}

const PaintingInfo = ({ painting }: PaintingInfoProps) => {
  const addCurrentArtist = useArtistStore((state) => state.addCurrentArtist)

  return (
    <>
      <div className={styles.main}>
        <div className={styles.title}>
          <h1>{painting?.title}</h1>
        </div>
        {painting?.image_id ? (
          <img
            src={`https://www.artic.edu/iiif/2/${painting?.image_id}/full/843,/0/default.jpg`}
            className={styles.paintingImg}
            alt="No image"
          ></img>
        ) : (
          <Image
            src={noImg}
            height={'500'}
            className={styles.paintingImg}
            alt={painting?.title || ''}
          />
        )}
        {painting?.date_end > 0 ? (
          <h3 className={styles.dates}>{painting?.date_end ? painting.date_end : 'No date'}</h3>
        ) : (
          <h3 className={styles.dates}>{`${painting.date_end + -painting.date_end * 2} B.C.`}</h3>
        )}
        <h3 className={styles.author}>
          {painting.artist_title ? painting.artist_title : 'No artist'}
        </h3>
      </div>
      <div className={styles.description}>
        <dl className={styles.description_table}>
          <dt>
            <h4>Artist</h4>
          </dt>
          <dd>
            <span>
              {painting.artist_title ? (
                <Link
                  href={`/artists/${painting.artist_id}`}
                  onClick={(e) => addCurrentArtist(e.currentTarget.text)}
                  className={styles.link}
                >
                  {painting.artist_title}
                </Link>
              ) : (
                '-'
              )}
            </span>
          </dd>
          <dt>
            <h4>Title</h4>
          </dt>
          <dd>
            <span>{painting.title ? painting.title : '-'}</span>
          </dd>
          <dt>
            <h4>Place</h4>
          </dt>
          <dd>
            <span>{painting.place_of_origin ? painting.place_of_origin : '-'}</span>
          </dd>
          <dt>
            <h4>Dates</h4>
          </dt>
          {painting.date_end > 0 ? (
            <dd>
              <span>
                {painting.date_start && painting.date_end
                  ? painting.date_start + ' - ' + painting.date_end
                  : 'No date'}
              </span>
            </dd>
          ) : (
            <dd>
              <span>
                {painting.date_start && painting.date_end
                  ? `${painting.date_start + -painting.date_start * 2} B.C.` +
                    ' - ' +
                    `${painting.date_end + -painting.date_end * 2} B.C.`
                  : 'No date'}
              </span>
            </dd>
          )}
          <dt>
            <h4>Medium</h4>
          </dt>
          <dd>
            <span>{painting.medium_display ?? '-'}</span>
          </dd>
          <dt>
            <h4>Dimensions</h4>
          </dt>
          <dd>
            <span>{painting.dimensions ?? '-'}</span>
          </dd>
          <dt>
            <h4>Credit line</h4>
          </dt>
          <dd>
            <span>{painting.credit_line ?? '-'}</span>
          </dd>
        </dl>
      </div>
    </>
  )
}

export default PaintingInfo
