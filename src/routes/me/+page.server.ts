import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/sign-in');
	}

	const userId = session.user.id;
	const restaurants = await supabase.from('restaurants').select('*').eq('owner_id', userId);

	return { session };
};

export const actions = {
	signout: async ({ locals: { supabase } }) => {
		await supabase.auth.signOut();
		throw redirect(303, '/');
	}
};
