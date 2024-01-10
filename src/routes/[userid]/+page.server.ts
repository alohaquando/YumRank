export const load = async ({ locals: { supabase }, params }) => {

	const { data: profile, error: profileError } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', params.userid)
		.single();

	console.log(profile);


	if (profileError) {
		console.error(profileError);
		return;
	}
	const { data: myReviews, error: reviewError } = await supabase
		.from('reviews')
		.select('restaurant_id, id, rating, restaurants (name, address) ')
		.eq('user_id', profile.id);


	if (reviewError) {
		console.error(reviewError);
		return;
	}

	return { myReviews, profile };

};