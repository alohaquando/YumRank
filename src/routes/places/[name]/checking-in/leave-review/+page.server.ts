import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase }, parent }) => {
	const { session } = await parent();

	if (!session) {
		throw redirect(303, '/sign-in');
	}

	const userId = session.user.id;
	const { data: myProfile, error: profileError } = await supabase
		.from('profiles')
		.select('full_name, avatar_url')
		.eq('id', userId)
		.single();

	if (profileError) {
		console.error(profileError);
	}

	return { session, myProfile };
};

export const actions = {
	create: async ({ request, locals: { supabase, getSession }, params }) => {
		const session = await getSession();
		const formData = await request.formData();
		const rating = formData.get('rating') as string;
		const text = formData.get('text') as File;

		const placeIdData = await supabase
		.from('restaurants')
		.select('id, name')
		.eq('name', params.name)
		.single();
		const placeId = placeIdData?.data?.id;
		const placeName = placeIdData?.data?.name;

		const {error} = await supabase.from('reviews').insert({
			restaurant_id: placeId,
			user_id: session?.user.id,
			text,
			rating,
			created_at: new Date()
		});
	
		if (error) {
			console.log(error);

			return fail(500, {
				failed: true,
				message: `${error.message}`
			});
		} else {
			throw redirect(303, `/places/${placeName}`);
		}
	}
}
