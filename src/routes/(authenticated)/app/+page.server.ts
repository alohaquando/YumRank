import { redirect } from '@sveltejs/kit'

export const load = async ({ locals: { getSession } }) => {
  const session = await getSession()
  console.log('session', session?.user)

  if (!session) throw redirect(307, '/auth')
  if (!session.user.user_metadata.user_name) throw redirect(307, '/account')
}