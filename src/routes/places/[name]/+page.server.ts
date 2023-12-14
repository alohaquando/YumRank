import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession }, params }) => {

  const { data: restaurant, error } = await supabase
  .from('restaurants')
  .select('*')
  .eq('name', params.name.replace('-', ' '));

  if (error) {
    console.error(error);
    return;
  }
  
  return { restaurant };
};