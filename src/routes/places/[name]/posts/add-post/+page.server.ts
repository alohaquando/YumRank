import { fail, redirect } from '@sveltejs/kit';
import {
	uploadAndGetPublicUrlFromSelected,
	uploadAndGetPublicUrlsFromSelected
} from '$lib/server/utils';

export const load = async ({ locals: { supabase, getSession }, parent }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	return { session };
};

export const actions = {
	create: async ({ request, locals: { supabase }, params }) => {
		const formData = await request.formData();
        const content = formData.get('content') as string;
        const postImages = formData.getAll('postImages') as File[];
    
		if (!content) {
			return fail(500, {
				failed: true,
				message: 'Make sure to include text'
			});
		}

		const postImagesUrls = await uploadAndGetPublicUrlsFromSelected(
			supabase,
			postImages,
			'postimages'
		);

        const { data: restaurant, error: placesError } = await supabase
            .from('restaurants')
            .select('id')
            .eq('name', params.name.replace('-', ' '))
            .single();

		const { error } = await supabase.from('posts').insert({
			restaurant_id: restaurant?.id,
			content: content,
			post_image_urls: postImagesUrls,
			created_at: new Date()
		});

		if (error) {
			console.log(error);
			return fail(500, {
				failed: true,
				message: `${error.message}`
			});
		} else {
			throw redirect(303, `/places/${params.name}/posts`);
		}
	}
};
