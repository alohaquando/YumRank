import { fail } from '@sveltejs/kit';

export const load = async ({ locals: { getSession } }) => {
	const session = await getSession();

	return { session };
};

export const actions = {
	favorite: async ({ params, locals: { supabase, getSession } }) => {
		const session = await getSession();
		const { data: restaurant, error: placesError } = await supabase
			.from('restaurants')
			.select('id, favorite_count')
			.eq('name', params.name.replace('-', ' '))
			.single();

		if (placesError) {
			return fail(500, {
				failed: true,
				message: `${placesError.message}`
			});
		}

		const { error: favoriteError } = await supabase
			.from('favorites')
			.insert([
				{ user_id: session?.user.id, place_id: restaurant?.id }
			]);

		if (favoriteError) {
			console.error(favoriteError);
			return fail(500, {
				failed: true,
				message: `${favoriteError.message}`
			});
		} else {
			const { error: updatePlaceFavoriteCountError } = await supabase
				.from('restaurants')
				.update({ favorite_count: restaurant?.favorite_count + 1 })
				.eq('id', restaurant?.id);

			if (updatePlaceFavoriteCountError) {
				return fail(500, {
					failed: true,
					message: `${updatePlaceFavoriteCountError.message}`
				});
			}
		}
	},
	unfavorite: async ({ params, locals: { supabase, getSession } }) => {
		const session = await getSession();
		const { data: restaurant, error: placesError } = await supabase
			.from('restaurants')
			.select('id, favorite_count')
			.eq('name', params.name.replace('-', ' '))
			.single();

		if (placesError) {
			return fail(500, {
				failed: true,
				message: `${placesError.message}`
			});
		}

		const { error: favoriteError } = await supabase
			.from('favorites')
			.delete()
			.eq('user_id', session?.user.id)
			.eq('place_id', restaurant?.id);

		if (favoriteError) {
			console.error(favoriteError);
			return fail(500, {
				failed: true,
				message: `${favoriteError.message}`
			});
		} else {
			const { error: updatePlaceFavoriteCountError } = await supabase
				.from('restaurants')
				.update({ favorite_count: restaurant?.favorite_count - 1 })
				.eq('id', restaurant?.id);

			if (updatePlaceFavoriteCountError) {
				return fail(500, {
					failed: true,
					message: `${updatePlaceFavoriteCountError.message}`
				});
			}
		}
	}
	// status: async ({ params, locals: { supabase, getSession } }) => {
	// 	const session = await getSession();
	//
	// 	const placeName = params.name.replace('-', ' ');
	//
	// 	const { data: restaurant, error: placesError } = await supabase
	// 		.from('restaurants')
	// 		.select('id')
	// 		.eq('name', placeName)
	// 		.single();
	// 	const { data, error } = await supabase
	// 		.from('favorites')
	// 		.select('place_id')
	// 		.eq('user_id', session?.user.id)
	// 		.eq('place_id', restaurant?.id);
	//
	// 	if (error) {
	// 		console.error(error);
	// 		return fail(500, {
	// 			failed: true,
	// 			message: `${error.message}`
	// 		});
	// 	} else {
	// 		return { status: 200, isFavorite: data.length > 0 };
	// 	}
	// }
};