export const load = async ({ locals: { supabase, getSession, userConnections }, params }) => {
	const session = await getSession();

	// console.log(userConnections);
	
	const placeName = params.name.replace('-', ' ');

	const { data: restaurant, error: placesError } = await supabase
		.from('restaurants')
		.select('*')
		.eq('name', placeName)
		.single();

	
	const placeOwner = restaurant?.owner_id as string;

	if (placesError) {
		console.error(placesError);
		return;
	}

	const placeIdData = await supabase
		.from('restaurants')
		.select('id')
		.eq('name', placeName)
		.single();
	const placeId = placeIdData?.data?.id;

	const { data: checkIns, error: checkInsError } = await supabase
		.from('reviews')
		.select('id, text, rating, created_at, profiles(full_name, avatar_url), restaurants(name)')
		.eq('restaurant_id', placeId);

	if (checkInsError) {
		console.error(checkInsError);
	}

	const { data: posts, error: postError } = await supabase
		.from('posts')
		.select(`id, content, created_at, post_image_urls,restaurants (name, logo_url)`)
		.eq('restaurant_id', placeId);

	if (postError) {
		console.error(postError);
	}

	if (placeOwner == session?.user.id) {
		return { restaurant, owner: true, placeName: params.name, checkIns, posts, placeId};
	} else {
		return { restaurant, owner: false, placeName: params.name, checkIns, posts };
	}
};
