import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()

  if (!session) {
    return redirect(301, '/sign-in');
  }

  const userId = session.user.id; 
  const restaurants = await supabase
  .from('restaurants')
  .select('*')
  .eq('owner_id', userId);
  
  return { restaurants };
};