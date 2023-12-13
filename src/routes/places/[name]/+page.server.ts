import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession }, params }) => {
  const session = await getSession()

  if (!session) {
    return redirect(301, '/sign-in');
  }

  const { data: restaurant, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('name', params.name);

  if (error) {
    console.error(error);
    return;
  }
  
  return { restaurant: restaurant[0]  };
};