import { create } from "zustand";
import { persist, devtools } from "zustand/middleware"

type useTagStoreState = {
	tag: string;
	setTag: (tag: string) => void;
}

const useTagStore =  create <useTagStoreState> ()(
	devtools(
		(set) => ({
			tag: '',
			setTag: (tag: string) => set(
				{
					tag: tag
				}
			),
		})
	)
)

export { useTagStore }