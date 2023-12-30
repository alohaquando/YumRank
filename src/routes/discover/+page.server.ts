import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
	const { data: posts, error } = await supabase
		.from('posts')
		.select(`title, context, restaurants (name)`);

	if (error) {
		console.error('Error fetching posts:', error);
		return;
	}

	return { posts };
};
