import { fail, redirect } from '@sveltejs/kit';
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
		.select('id')
		.eq('name', params.name)
		.single();
        
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
