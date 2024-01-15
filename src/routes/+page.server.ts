import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession, userConnections }, url }) => {
	const session = await getSession();

	if (url.pathname === '/') {
		console.log('session', session?.user);
	}

	if (session && !session.user.user_metadata.user_name) {
		throw redirect(307, '/complete-account');
	}

	// Fetch all restaurants
	const { data: restaurants, error } = await supabase.from('restaurants').select('*');

	if (error) {
		console.error(error);
		return;
	}

	// Fetch reviews and calculate scores for each restaurant
	for (let restaurant of restaurants) {
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
	restaurants.sort((a, b) => b.score - a.score);

	return {
		restaurants
	};
};


