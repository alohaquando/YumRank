import { fail, redirect } from '@sveltejs/kit';
import { deleteFromBucket, uploadAndGetPublicUrlFromSelected, uploadAndGetPublicUrlsFromSelected } from '$lib/server/utils';

export const load = async ({ locals: { supabase }, params }) => {
    const restaurantQuery = await supabase
        .from('restaurants')
        .select('id, name, logo_url')
        .eq('name', params.name.replace('-', ' '));

    const restaurant_id = restaurantQuery?.data?.[0]?.id;
    const restaurant_name = restaurantQuery?.data?.[0]?.name;
    const restaurant_logo = restaurantQuery?.data?.[0]?.logo_url;

    if (!restaurant_id) {
        console.error('Restaurant ID not found');
        return { post: null }; // or handle the scenario where restaurant_id is not found
    }

    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('restaurant_id', restaurant_id)
        .eq('id', BigInt(params.postId));

    if (error) {
        console.error(error);
        return;
    }
    
    return { post, restaurant_name, restaurant_logo };
};

export const actions = {
    update: async ({ request, locals: { supabase }, params }) => {
        const formData = await request.formData();
        const content = formData.get('content') as string;
        const postImages = formData.getAll('postImages') as File[];

        console.log(postImages);

        const { data: currentData, error: fetchError } = await supabase
            .from('postss')
            .select('post_image_urls')
            .eq('id', BigInt(params.postId))
            .single();

        if (fetchError) {
            console.error('Error fetching current data:', fetchError);
            // Handle the error as needed
        }

        const oldPostImagesUrls = currentData?.post_image_urls;

        let postImagesUrls: string | string[] = [];

        if (postImages.length > 0 && postImages[0].type !== 'application/octet-stream') {
            postImagesUrls = await uploadAndGetPublicUrlsFromSelected(supabase, postImages, 'postimages');
            console.log(postImagesUrls);
            for (const url of oldPostImagesUrls) {
                const [, , , , , , , , filename] = url.split('/');
                await deleteFromBucket(supabase, 'postimages', filename);
            }
        }

        const upsertData = {
            content,
            post_image_urls: postImagesUrls && postImagesUrls.length > 0 ? postImagesUrls : undefined,
        };


        const { error } = await supabase.from('posts').upsert(upsertData);

        if (error) {
            console.log(error);

            return fail(500, {
                failed: true,
                message: `${error.message}`
            });
        } else {
            throw redirect(303, `/places/${params.name}/posts/`);
        }
    },
    
    delete: async ({ locals: { supabase }, params }) => {
        const { data: currentData, error: fetchError } = await supabase
            .from('posts')
            .select('post_image_urls')
            .eq('id', BigInt(params.postId))
            .single();

        if (fetchError) {
            console.error('Error fetching current data:', fetchError);
            // Handle the error as needed
        }

        const oldPostImagesUrls = currentData?.post_image_urls;

        for (const url of oldPostImagesUrls) {
            const [, , , , , , , , filename] = url.split('/');
            await deleteFromBucket(supabase, 'postimages', filename);
        }
		const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', BigInt(params.postId));

        if (error) {
            console.log(error);

            return fail(500, {
                failed: true,
                message: `${error.message}`
            });
        } else {
            throw redirect(303, `/places/${params.name}/posts/`);
        }
	}
};

