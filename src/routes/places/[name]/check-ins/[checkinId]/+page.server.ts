export const load = async ({ locals: { supabase }, params }) => {
	const restaurantQuery = await supabase
		.from('restaurants')
		.select('id, name, logo_url')
		.eq('name', params.name.replace('-', ' '));
	
	const restaurant_id = restaurantQuery?.data?.[0]?.id;

	const { data: review, error } = await supabase
		.from('reviews')
		.select('id, text, rating, created_at, profiles(full_name, avatar_url)')
		.eq('restaurant_id', restaurant_id)
		.eq('id', BigInt(params.checkinId));
	if (error) {
		console.error(error);
		return;
	}
	
	return { review };
};
