import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

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
  
      const { error } = await supabase
        .from('favorites')
        .insert([
          { user_id: session?.user.id, place_id: restaurant?.id },
        ]);
  
      if (error) {
        console.error(error);
        return fail(500, {
          failed: true,
          message: `${error.message}`,
        });
      } else {
        const { data: update, error: updateError } = await supabase
          .from('restaurants')
          .update({ favorite_count: restaurant?.favorite_count + 1})
          .eq('id', restaurant?.id);
        return { status: 200 };
      }
    },
    unfavorite: async ({ params, locals: { supabase, getSession } }) => {
      const session = await getSession();
      const { data: restaurant, error: placesError } = await supabase
      .from('restaurants')
      .select('id, favorite_count')
      .eq('name', params.name.replace('-', ' '))
      .single();
  
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', session?.user.id)
        .eq('place_id', restaurant?.id);
  
      if (error) {
        console.error(error);
        return fail(500, {
          failed: true,
          message: `${error.message}`,
        });
      } else {
        const { data: update, error: updateError } = await supabase
          .from('restaurants')
          .update({ favorite_count: restaurant?.favorite_count - 1})
          .eq('id', restaurant?.id);
        return { status: 200 };
      }
    },
    status: async ({ params, locals: { supabase, getSession } }) => {
        console.log('bruh');
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