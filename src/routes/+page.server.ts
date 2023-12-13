import { redirect } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession()
  console.log('session', session?.user)

  if (session && !session.user.user_metadata.user_name) {
    throw redirect(307, '/create-account');
  } 

  const restaurants = await supabase
  .from('restaurants')
  .select('*');
  
  return { restaurants };
}

export const actions = {
  signout: async ({ locals: { supabase } }) => {
    await supabase.auth.signOut()
    throw redirect(303, '/')
  }
}