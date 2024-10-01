import { lazy, Suspense, useEffect, useState } from 'react'

// Components
import { Loading } from '@/components/Loading'

// Stores, utils, libs
import { useRouter } from 'next/router'
import { PaintingModel } from '@/types/Paintings'
import { paintingsApi } from '@/api/paintings'

// CSS
import styles from './Painting.module.sass'

const emptyPainting: PaintingModel = {
  id: 0,
  title: '',
  image_id: '',
  artist_title: '',
  category_titles: [''],
  classification_title: '',
  date_end: 0,
  date_start: 0,
  department_title: '',
  dimensions: '',
  exhibition_history: '',
  place_of_origin: '',
  provenance_text: '',
  publication_history: '',
  medium_display: '',
}

const PaintingInfo = lazy(() => import('./PaintingInfo'))

export default function Painting(): JSX.Element {
  const [painting, setPainting] = useState(emptyPainting)
  const router = useRouter()

  useEffect(() => {
    if (router.asPath !== router.route) {
      if (typeof router.query.id === 'string') {
        paintingsApi.getPainting(router.query.id).then((painting) => {
          setPainting(painting.data)
        })
      }
    }
  }, [router])

  return (
    <div className={styles.paintingPage}>
      <div className={styles.container}>
        <div className={styles.painting}>
          <Suspense fallback={<Loading />}>
            <PaintingInfo painting={painting} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
