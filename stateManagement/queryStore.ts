import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

type useQueryStoreState = {
  query: string
  setQuery: (query: string) => void
  isSend: boolean
  setIsSend: (isSend: boolean) => void
}

const useQueryStore = create<useQueryStoreState>()(
  devtools((set) => ({
    query: '',
    setQuery: (query: string) =>
      set({
        query: query,
      }),
    isSend: false,
    setIsSend: (isSend) =>
      set({
        isSend: isSend,
      }),
  })),
)

export { useQueryStore }
