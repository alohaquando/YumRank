import { fail, redirect } from '@sveltejs/kit';
import { deleteFromBucket } from '$lib/server/utils';

export const load = async ({ parent, locals: {supabase} }) => {
	const session = await parent();

    if (!session) {
        throw redirect(303, '/sign-in');
    }

    return  session ;
};

export const actions = {
	delete: async ({ locals: { supabase }, params }) => {
        const placeIdData = await supabase
		.from('restaurants')
		.select('id, logo_url, res_images')
		.eq('name', params.name)
		.single();
        
        const oldLogoUrl = placeIdData?.data?.logo_url;
        const oldRestaurantImagesUrls = placeIdData?.data?.res_images;

        const [, , , , , , , , logo] = oldLogoUrl.split('/');
        const delLogo = await deleteFromBucket(supabase, 'logo', logo);

        for (const url of oldRestaurantImagesUrls) {
            const [, , , , , , , , resImages] = url.split('/');
            await deleteFromBucket(supabase, 'resimages', resImages);
        }
        
	    const placeId = placeIdData?.data?.id;
		const { error } = await supabase
            .from('restaurants')
            .delete()
            .eq('id', placeId);

        if (error) {
            console.log(error);

            return fail(500, {
                failed: true,
                message: `${error.message}`
            });
        } else {
            throw redirect(303, `/me/managed-places`);
        }
	}
};
