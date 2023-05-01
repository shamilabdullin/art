export type PaintingModel = {
	id: number;
	title: string;
	image_id: string;
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
	medium_display: string;
	artist_id?: string;
	credit_line?: string;
	is_public_domain?: boolean;
}

export type PaintingQueryModel = {
	api_link: string;
	api_model: string;
	id: string;
	is_boosted: boolean;
	thumbnail: any;
	timestamp: string;
	title: string;
	_score: number;
}