import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase }, parent }) => {
	const { session } = await parent();

	if (!session) {
		throw redirect(303, '/sign-in');
	}

	const userId = session.user.id;
	const {
		data: myProfile,
		error: profileError
	} = await supabase.from('profiles').select('full_name, avatar_url').eq('id', userId).single();

	if (profileError) {
		console.error(profileError);
	}

	return { session, myProfile };
};

