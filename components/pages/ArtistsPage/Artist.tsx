import React, { useEffect, useState } from 'react'

// Components
import { Collage } from '@/components/Collage'
import { Loading } from '@/components/Loading'
import { MemoizedPageController } from '@/components/PageController'
import Image from 'next/image'

// Stores, utils, libs
import { paintingsApi } from '@/api/paintings'
import { PaintingModel, PaintingQueryModel } from '@/types/Paintings'
import sadSmile from 'public/sad-smile.svg'
import { useArtistStore } from '@/stateManagement/artistsStore'

// CSS
import styles from './ArtistPage.module.sass'

const Artist: React.FC = () => {
  const [artistPaintings, setArtistPaintings] = useState<PaintingQueryModel[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [paintings, setPaintings] = useState<any[] | PaintingModel[]>([])
  const [currentPage, setCurrentPage] = useState('1')
  const [totalPages, setTotalPages] = useState('1')
  const currentArtist = useArtistStore((state) => state.currentArtist)

  useEffect(() => {
    setIsLoading(true)
    const currentUrl = window.location.href.split('/')[4]
    paintingsApi.postArtistsPaintings('', currentUrl, currentPage).then((res) => {
      setArtistPaintings(res.data)
      if (res.pagination) {
        setTotalPages(res.pagination?.total_pages)
      }
      if (res.data.length === 0) setIsLoading(false)
    })
  }, [currentPage])

  useEffect(() => {
    if (artistPaintings.length > 0) {
      setIsLoading(true)
      let ids = artistPaintings.map((artistPainting) => artistPainting.id)
      let request = ids.map((id) => paintingsApi.getPainting(id))
      Promise.all(request).then((res) => {
        const paintings = res.map((responsiveData) => responsiveData.data)
        setPaintings(paintings)
        setIsLoading(false)
      })
    }
  }, [artistPaintings])

  return (
    <div>
      <div className={styles.artist_page}>
        <div className={styles.container}>
          <div className={styles.artist_name}>
            <h1>{currentArtist === '' ? "Artist's title" : currentArtist}</h1>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {paintings[0] ? (
                <>
                  <Collage paintings={paintings} />
                  {Number(totalPages) > 1 ? (
                    <div className={styles.page_controller}>
                      <MemoizedPageController
                        page={currentPage}
                        setPage={setCurrentPage}
                        totalPages={totalPages}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <div className={styles.no_public_domain}>
                  <div>
                    <div className={styles.no_public_title}>
                      <h6>Sorry, we haven&apos;t got paintings of this artist in public domain</h6>
                    </div>
                    <Image src={sadSmile} alt="sad smile" width={150} height={150} />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Artist
