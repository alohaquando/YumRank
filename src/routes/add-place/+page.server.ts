import { fail, redirect } from '@sveltejs/kit';
import {
	uploadAndGetPublicUrlFromSelected,
	uploadAndGetPublicUrlsFromSelected
} from '$lib/server/utils';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	return { session };
};

export const actions = {
	create: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const logoImage = formData.get('logoUrl') as File;
		const address = formData.get('address') as string;
		const description = formData.get('description') as string;
		const restaurantImages = formData.getAll('restaurantImages') as File[];
		const menuImages = formData.getAll('menuImages') as string[];

		if (logoImage.size === 0 || restaurantImages[0].size === 0) {
			return fail(500, {
				failed: true,
				message: 'Make sure to include a logo image and images of your place'
			});
		}

		const logoUrl = await uploadAndGetPublicUrlFromSelected(supabase, logoImage, 'logo');
		const restaurantImagesUrls = await uploadAndGetPublicUrlsFromSelected(
			supabase,
			restaurantImages,
			'resimages'
		);

		const { error } = await supabase.from('restaurants').insert({
			name: name,
			logo_url: logoUrl[0],
			address: address,
			is_verified: false,
			description: description,
			res_images: restaurantImagesUrls,
			menu_images: menuImages,
			created_at: new Date()
		});

		if (error) {
			console.log(error);

			if (
				error.message.includes(
					'duplicate key value violates unique constraint "restaurants_name_key"'
				)
			) {
				return fail(500, {
					failed: true,
					message: `Another place already took this name. Please try a different name`
				});
			}

			return fail(500, {
				failed: true,
				message: `${error.message}`
			});
		} else {
			throw redirect(303, `/places/${name}`);
		}
	}
};
