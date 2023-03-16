export type PaintingModel = {
	id: number;
	title: string;
	image_id: number;
	artist_title: string;
	category_titles: string[];
	classification_title: string;
	date_start: number;
	date_end: number;
	department_title: string;
	dimensions: string;
	exhibition_history: string;
	place_of_origin: string;
	provenance_text: string;
	publication_history: string;
}