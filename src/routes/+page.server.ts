import { redirect } from '@sveltejs/kit'
import { page } from '$app/stores';

export const load = async ({ locals: { supabase, getSession, userConnections }, url }) => {
  const session = await getSession();


  if (url.pathname  === '/') {
    console.log('session', session?.user);
  }

  if (session && !session.user.user_metadata.user_name) {
    throw redirect(307, '/create-account');
  } 

  const restaurants = await supabase
    .from('restaurants')
    .select('*');
  
  return { restaurants };
};

export const actions = {
  signout: async ({ locals: { supabase } }) => {
    await supabase.auth.signOut()
    throw redirect(303, '/')
  }
}