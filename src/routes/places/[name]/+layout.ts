import { currentPlaceName } from '$lib/data/currentPlaceName';

export const load = async ({ params }) => {
	// Set placeName for URL navigation
	console.log('layout ' + params.name);
	if (params.name != 'undefined') {
		currentPlaceName.set(params.name);
	}
};