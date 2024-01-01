import { redirect } from '@sveltejs/kit';
import { page } from '$app/stores';

export const load = async ({ locals: { supabase, getSession, userConnections }, url }) => {
	const session = await getSession();

	if (url.pathname === '/') {
		console.log('session', session?.user);
	}

	if (session && !session.user.user_metadata.user_name) {
		throw redirect(307, '/complete-account');
	}

	const { data: restaurants, error } = await supabase.from('restaurants').select('*');

	if (error) {
		console.error(error);
		return;
	}

	return {
		restaurants
	};
};


