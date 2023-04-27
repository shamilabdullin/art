export type ArtistModel = {
	alt_titles: string[];
	api_link: string;
	api_model: string;
	birth_date: number;
	death_date: string;
	description: string;
	id: number;
	is_artist: boolean;
	sort_title: string;
	source_updated_at: string;
	suggest_autocomplete_all: any;  // todo change
	timestamp: string;
	title: string;
	ulan_id: any;
	updated_at: string;
}

export type ArtistQueryModel = {
	api_link: string;
	api_model: string;
	id: string;
	timestamp: string;
	title: string;
	_score: string;
}