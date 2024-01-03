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
		const text = formData.get('text') as string;
	  
		const placeIdData = await supabase
		  .from('restaurants')
		  .select('id, name')
		  .eq('name', params.name.replace('-', ' '))
		  .single();

		const placeId = placeIdData?.data?.id;
		const placeName = placeIdData?.data?.name;
	  
		// Insert the new review
		const { error: insertError } = await supabase
		  .from('reviews')
		  .insert([{ user_id: session?.user.id, restaurant_id: placeId, rating, text }]);
	  
		if (insertError) {
		  console.error(insertError);
		  return fail(500, {
			failed: true,
			message: `${insertError.message}`,
		  });
		}
	  
		// Fetch all reviews for the place
		const { data: reviews, error: reviewsError } = await supabase
		  .from('reviews')
		  .select('rating')
		  .eq('restaurant_id', placeId);
	  
		if (reviewsError) {
		  console.error('bruh');
		  return fail(500, {
			failed: true,
			message: `${reviewsError.message}`,
		  });
		}
	  
		// Calculate the new average rating
		const avgRating = reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;
	  
		// Increment the number of reviews
		const numReviews = reviews.length;
	  
		// Update the place with the new avgRating and numReviews
		const { data: update, error: updateError } = await supabase
		  .from('restaurants')
		  .update({ avgRating, numReviews})
		  .eq('id', placeId);
		  	
		console.log(update);
		
		if (updateError) {
		  return fail(500, {
			failed: true,
			message: `${updateError.message}`,
		  });
		} else {
			throw redirect(303, `/places/${placeName}`);
		}
	  
	  },
}
