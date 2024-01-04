import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase } }) => {
	const { data: posts, error } = await supabase
		.from('posts')
		.select(`id, content, created_at, post_image_urls,restaurants (name, logo_url)`);

	if (error) {
		console.error('Error fetching posts:', error);
		return;
	}

	return { posts };
};
