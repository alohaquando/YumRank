import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession }, params }) => {
	const session = await getSession();

	if (!session) {
		return redirect(301, '/sign-in');
	}

	console.log('bruh');
};
