import { fail, redirect } from '@sveltejs/kit';
import {
	uploadAndGetPublicUrlFromSelected,
	uploadAndGetPublicUrlsFromSelected
} from '$lib/server/utils';

export const load = async ({ parent }) => {
	const {session, restaurant } = await parent();

	if (!session) {
		throw redirect(303, '/');
	}

	return { session, restaurant };
};

export const actions = {
	update: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const logoImage = formData.get('logoUrl') as File;
		const address = formData.get('address') as string;
		const description = formData.get('description') as string;
		const restaurantImages = formData.getAll('restaurantImages') as File[];

        const { data: currentData, error: fetchError } = await supabase
            .from('restaurants')
            .select('logo_url, res_images')
            .eq('name', name)
            .single();

        if (fetchError) {
        console.error('Error fetching current data:', fetchError);
        // Handle the error as needed
        }

        // Store the old URLs
        const oldLogoUrl = currentData?.logo_url;
        const oldRestaurantImagesUrls = currentData?.res_images;

        let logoUrl: string[] = [];
        if (logoImage.type !== 'application/octet-stream') {
            logoUrl = await uploadAndGetPublicUrlFromSelected(supabase, logoImage, 'logo');
        }

        let restaurantImagesUrls: string[] = [];
        if (restaurantImages[0].type !== 'application/octet-stream') {
            restaurantImagesUrls = await uploadAndGetPublicUrlsFromSelected(supabase, restaurantImages, 'resimages');
        }

        const { error } = await supabase
            .from('restaurants')
            .upsert({
                name,
                ...(logoUrl ? { logo_url: logoUrl[0] } : {}),
                address,
                description,
                ...(restaurantImagesUrls.length > 0 ? { res_images: restaurantImagesUrls } : {}),
            }, {
                onConflict: 'name', // This is the conflict_target
        });


		if (error) {
			console.log(error);

			return fail(500, {
				failed: true,
				message: `${error.message}`
			});
		} else {
			throw redirect(303, `/places/${name}`);
		}

        // if (logoUrl) {
        //     await deleteFromBucket(supabase, oldLogoUrl);
        //   }
          
        //   for (const url of oldRestaurantImagesUrls) {
        //     await deleteFromBucket(supabase, url);
        //   }
	}
};

