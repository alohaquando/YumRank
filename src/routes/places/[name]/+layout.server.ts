import { fail } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession, userConnections }, params }) => {
	const session = await getSession();

	// console.log(userConnections);

	const placeName = params.name.replace('-', ' ');

	const { data: restaurant, error: placesError } = await supabase
		.from('restaurants')
		.select('*')
		.eq('name', placeName)
		.single();

	const placeOwner = restaurant?.owner_id as string;

	if (placesError) {
		console.error(placesError);
		return;
	}

	const placeIdData = await supabase
		.from('restaurants')
		.select('id')
		.eq('name', placeName)
		.single();
	const placeId = placeIdData?.data?.id;

	// Get all checkIns
	const { data: checkIns, error: checkInsError } = await supabase
		.from('reviews')
		.select('id, text, rating, created_at, profiles(full_name, avatar_url), restaurants(name)')
		.eq('restaurant_id', placeId);

	if (checkInsError) {
		console.error(checkInsError);
	}

	// Get all posts
	const { data: posts, error: postError } = await supabase
		.from('posts')
		.select(`id, content, created_at, post_image_urls,restaurants (name, logo_url)`)
		.eq('restaurant_id', placeId);

	if (postError) {
		console.error(postError);
	}

	// Get isFavorite
	const { data: isFavoriteData, error: favoriteError } = await supabase
		.from('favorites')
		.select('place_id')
		.eq('user_id', session?.user.id)
		.eq('place_id', placeId);

	let isFavorite = false;

	if (favoriteError) {
		console.error(favoriteError);
	} else {
		isFavorite = isFavoriteData?.length > 0.;
	}
	
	// Fetch all restaurants
	const { data: restaurantsRanking, error } = await supabase.from('restaurants').select('*');

	if (error) {
		console.error(error);
		return;
	}

	// Fetch reviews and calculate scores for each restaurant
	for (let restaurant of restaurantsRanking) {
		const { data: reviews, error } = await supabase
			.from('reviews')
			.select('rating')
			.eq('restaurant_id', restaurant.id);

		if (error) {
			console.error(error);
			continue;
		}

		// Calculate the sum of all review ratings
		const reviewSum = reviews.reduce((sum, review) => sum + review.rating, 0);

		// Add the review sum to the favorite_count to get the combined score
		restaurant.score = reviewSum + restaurant.favorite_count;
	}

	// Sort the restaurants by the combined score
	restaurantsRanking.sort((a, b) => b.score - a.score);

	let i: number;
	let placeRanking: number = 0;

	for (i = 0; i < restaurantsRanking.length; i++) {
		if (restaurantsRanking[i].name === placeName) {
			placeRanking = i + 1;
		}
	}

	if (placeOwner == session?.user.id) {
		return { restaurant, placeRanking, owner: true, placeName: params.name, checkIns, posts, isFavorite, placeId };
	} else {
		return { restaurant, placeRanking, owner: false, placeName: params.name, checkIns, posts, isFavorite };
	}
};
