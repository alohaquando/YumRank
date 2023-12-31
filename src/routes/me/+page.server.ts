import { redirect } from '@sveltejs/kit';

export const actions = {
	signout: async ({ locals: { supabase } }) => {
		await supabase.auth.signOut();
		throw redirect(303, '/');
	}
};