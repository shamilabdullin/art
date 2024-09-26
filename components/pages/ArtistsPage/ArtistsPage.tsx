import React, { useEffect, useState } from 'react'

// Components
import { PageController } from '@/components/PageController'
import { SearchBar } from '@/components/SearchBar'
import { Loading } from '@/components/Loading'

// Stores, utils, libs
import { artistsApi } from '@/api/artists'
import Link from 'next/link'
import { useArtistStore, useArtistsStore } from '@/stateManagement/artistsStore'

// CSS
import styles from './ArtistsPage.module.sass'

export const ArtistsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [pages, setPages] = useState('1')
  const [query, setQuery] = useState('')
  const [isQuerySend, setIsQuerySend] = useState(false)
  const [currentPage, setCurrentPage] = useState('1')
  const addCurrentArtist = useArtistStore((state) => state.addCurrentArtist)
  const artists = useArtistsStore((state) => state.currentArtists)
  const setArtists = useArtistsStore((state) => state.changeCurrentArtists)

  useEffect(() => {
    setIsLoading(true)
    artistsApi
      .getArtistsQuery(query, currentPage)
      .then((res) => {
        setArtists(res.data)
        if (res.pagination) {
          setPages(res.pagination.total_pages)
        }
      })
      .then(() => setIsLoading(false))
  }, [currentPage, isQuerySend])

  const artistHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    addCurrentArtist(e.currentTarget.text)
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleQueryClick = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setIsQuerySend(!isQuerySend)
  }

  return (
    <div>
      <div className={styles.artists_page}>
        <div className={styles.container}>
          <div className={styles.artists}>
            <div className={styles.artists_title}>
              <h1>Find your artist</h1>
            </div>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <div className={styles.artists_list}>
                  {artists.map((artist) => (
                    <div key={artist.id} className={styles.artist}>
                      <Link
                        href={`/artists/${artist.id}`}
                        className={styles.artist_link}
                        onClick={artistHandler}
                      >
                        {artist.title}
                      </Link>{' '}
                    </div>
                  ))}
                </div>
                <div className={styles.search_bar}>
                  <SearchBar
                    handleQueryChange={handleQueryChange}
                    handleQueryClick={handleQueryClick}
                    buttonBackgroundColor="#261f27"
                    searchBarLength="300"
                    addLink={false}
                    placeholder={"Artist's name"}
                    formClass={styles.search_bar_form}
                    inputClass={styles.search_bar_input}
                    buttonClass={styles.search_bar_button}
                  />
                </div>
                <div className={styles.page_controller}>
                  <PageController page={currentPage} totalPages={pages} setPage={setCurrentPage} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
