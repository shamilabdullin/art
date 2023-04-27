import { create } from "zustand";
import { persist, devtools } from "zustand/middleware"

type useArtistStoreState = {
	currentArtist: string;
	addCurrentArtist: (artistName: string) => void;
}

const useArtistStore = create <useArtistStoreState> ()(  // need to use persist
	devtools(
		(set) => ({  // persist(
			currentArtist: '',
			addCurrentArtist: (artistName: string) => set(
				{
					currentArtist: artistName
				}
			)
		}),
		// {
		// 	name: 'artist-storage'
		// }
	)
)

export { useArtistStore }