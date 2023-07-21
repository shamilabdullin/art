import { create } from "zustand";
import { persist, devtools } from "zustand/middleware"

type useTagStoreState = {
	tag: string;
	setTag: (tag: string) => void;
	isTagPressed: boolean;
	setIsTagPressed: (isTagPressed: boolean) => void;
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
			isTagPressed: false,
			setIsTagPressed: (isTagPressed) => set(
				{
					isTagPressed: isTagPressed
				}
			)
		})
	)
)

export { useTagStore }