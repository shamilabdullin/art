import { ArtistModel } from "@/types/Artists";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware"

type useArtistStoreState = {
	currentArtist: string;
	addCurrentArtist: (artistName: string) => void;
}

type useArtistsStoreState = {
	currentArtists: ArtistModel[];
	changeCurrentArtists: (artists: ArtistModel[]) => void;
	currentPage: string;
	setCurrentPage: (page: string) => void;
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

const useArtistsStore = create <useArtistsStoreState> ()(
	devtools(
		(set) => ({
			currentArtists: [],
			changeCurrentArtists: (artists: ArtistModel[]) => set(
				{
					currentArtists: artists
				}
			),
			currentPage: '1',
			setCurrentPage: (page: string) => set(
				{
					currentPage: page
				}
			)
		})
	)
)

export { useArtistStore }
export { useArtistsStore }