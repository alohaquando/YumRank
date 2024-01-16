import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase }, parent }) => {
	const { session } = await parent();

	if (!session) {
		throw redirect(303, '/sign-in');
	}

	const userId = session.user.id;
	const { data: myProfile, error: profileError } = await supabase
		.from('profiles')
		.select('full_name, avatar_url')
		.eq('id', userId)
		.single();
	const { data: myPlaces, error: myPlacesError } = await supabase
		.from('restaurants')
		.select('*')
		.eq('owner_id', userId);

	const { data: myReviews, error: reviewError } = await supabase
	.from('reviews')
	.select('restaurant_id, id, rating, restaurants (name, address) ')
	.eq('user_id', userId);


	if (reviewError) {
		console.error(reviewError);
		return;
	}

	if (profileError) {
		console.error(profileError);
	}

	if (myPlacesError) {
		console.error(myPlacesError);
	}

	return { session, myPlaces, myProfile, myReviews };
};
