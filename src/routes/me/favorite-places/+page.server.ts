import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase }, parent }) => {
	const { session } = await parent();

	if (!session) {
		throw redirect(303, '/sign-in');
	}

	const { data: myFavorites, error: profileError } = await supabase
		.from('favorites')
		.select('place_id')
		.eq('user_id', session.user.id);

    console.log(myFavorites);
        
    const placeIds: Number[] = myFavorites?.map(favorite => favorite.place_id) as Number[];

    const { data: places, error: placesError } = await supabase
            .from('restaurants')
            .select('*')
            .in('id', placeIds);

    if (placesError) {
        console.error(placesError);
        return;
    }
    
	return { places };
};