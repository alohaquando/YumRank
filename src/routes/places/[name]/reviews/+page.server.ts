import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession }, params }) => {
	const restaurant_id = await supabase
		.from('restaurants')
		.select('id')
		.eq('name', params.name.replace('-', ' '));

	const { data: reviews, error } = await supabase
		.from('reviews')
		.select('*')
		.eq('restaurant_id', restaurant_id);

	if (error) {
		console.error(error);
		return;
	}

	return { reviews };
};
