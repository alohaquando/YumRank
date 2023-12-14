import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession }, params }) => {
  const session = await getSession()
  const { data: restaurant, error } = await supabase
  .from('restaurants')
  .select('*')
  .eq('name', params.name.replace('-', ' '));

  let resownern = (restaurant && restaurant[0])?.owner_id as string;

  if (resownern == session?.user.id) { 
    throw redirect(303, `/management/places/${params.name}`)
  }
  
  if (error) {
    console.error(error);
    return;
  }


  return { restaurant };
};