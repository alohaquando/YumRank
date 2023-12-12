import { redirect } from '@sveltejs/kit'

export const load = async ({ locals: { getSession } }) => {
  const session = await getSession()
  console.log('session', session?.user)

  if (!session?.user.user_metadata.user_name) {
    return redirect(307, '/create-account');
  } else {
    // Continue to stay at the page
    return;
  }
}