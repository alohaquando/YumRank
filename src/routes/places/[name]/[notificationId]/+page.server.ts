import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase }, parent, params }) => {
	const { session, restaurant } = await parent();

	if (!session) {
		throw redirect(303, '/sign-in');
	}

    const { data: noti, error: notiError } = await supabase
    .from('notifications')
    .select('*, restaurants (name), profiles (username)')
    .eq('id', params.notificationId)
    .single();
	
    
	return { noti };
};