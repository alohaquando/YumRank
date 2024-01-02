import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	return { session };
};

export const actions = {
    favorite: async ({ request, locals: { supabase, getSession } }) => {
      const session = await getSession();
      const { placeId } = await request.json();
  
      const { error } = await supabase
        .from('favorites')
        .insert([
          { user_id: session?.user.id, place_id: placeId },
        ]);
  
      if (error) {
        console.error(error);
        return fail(500, {
          failed: true,
          message: `${error.message}`,
        });
      } else {
        return { status: 200 };
      }
    },
    unfavorite: async ({ request, locals: { supabase, getSession } }) => {
      const session = await getSession();
      const { placeId } = await request.json();
  
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', session?.user.id)
        .eq('place_id', placeId);
  
      if (error) {
        console.error(error);
        return fail(500, {
          failed: true,
          message: `${error.message}`,
        });
      } else {
        return { status: 200 };
      }
    },
    status: async ({ params, locals: { supabase, getSession } }) => {
      const session = await getSession();
      
      const placeName = params.name.replace('-', ' ');

      const { data: restaurant, error: placesError } = await supabase
        .from('restaurants')
        .select('id')
        .eq('name', placeName)
        .single();
      const { data, error } = await supabase
        .from('favorites')
        .select('place_id')
        .eq('user_id', session?.user.id)
        .eq('place_id', restaurant?.id);
    
      if (error) {
        console.error(error);
        return fail(500, {
          failed: true,
          message: `${error.message}`,
        });
      } else {
        return { status: 200, isFavorite: data.length > 0 };
      }
    },
  }