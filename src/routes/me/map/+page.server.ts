import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase }, parent }) => {
	const { session } = await parent();

	if (!session) {
		throw redirect(303, '/sign-in');
	}

	const { data: myReviews, error: reviewError } = await supabase
		.from('reviews')
		.select('place_id, rating, restaurants (name, address) ')
		.eq('user_id', session.user.id);

	console.log(myReviews);


	if (reviewError) {
		console.error(reviewError);
		return;
	}

	return { myReviews };
};