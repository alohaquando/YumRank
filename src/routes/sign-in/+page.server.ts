import { fail, redirect } from '@sveltejs/kit'
import { AuthApiError, type Provider } from '@supabase/supabase-js'

export const load = async ({ locals: { getSession } }) => {
  const session = await getSession()

  /* User is already logged in. */
  if (session) throw redirect(303, '/')
}

export const actions = {
  signin: async ({ request, url, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const provider = formData.get('provider') as Provider

    if (email && password) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
    
      if (error) {
        if (error instanceof AuthApiError && error.status === 400) {
          return fail(400, {
            error: 'Invalid credentials.',
            data: {
              email
            }
          })
        }
        return fail(500, {
          error: 'Server error. Try again later.',
          data: {
            email
          }
        })
      }

      /* Login successful, redirect. */
      throw redirect(303, '/')
      
    } else if (provider) {
      /* OAuth sign-in. */

      /**
       * Sign-in will not happen yet, because we're on the server-side, 
       * but we need the returned url.
       */
      const { data, error } = await supabase.auth.signInWithOAuth({ 
        provider,
        options: {
          redirectTo: `${url.origin}/sign-in/callback?next=/`
        }
      })

      if (error) throw error

      /* Now authorize sign-in on browser. */
      if (data.url) throw redirect(303, data.url)

    } else {
      return fail(400, {
        error: 'Please enter an email and password',
        data: {
          email
        }
      })
    }
  },
  forgot: async ({ request, url, locals: { supabase } }) => {
		const form_data = await request.formData();
		const email = form_data.get('email') as string;

		// console.log(PUBLIC_SITE_URL + '/auth?reset')
		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${url.origin}/reset?reset`
		});

		if (error) {
			if (error instanceof AuthApiError) {
				return fail(400, {
					error: error.message
				});
			}
			return fail(500, {
				error: 'Server error. Try again later.'
			});
		} else {
			return {
				message: 'Reset link sent to email'
			};
		}
	},
  reset: async ({ request, locals: { supabase } }) => {
		const form_data = await request.formData();
		const password = form_data.get('password') as string;

		const { error } = await supabase.auth.updateUser({
			password
		});

		if (error) {
			if (error instanceof AuthApiError) {
				return fail(400, {
					error: error.message
				});
			}
			return fail(500, {
				error: 'Server error. Try again later.'
			});
		}

		throw redirect(303, '/');
	},

  signout: async ({ locals: { supabase } }) => {
    await supabase.auth.signOut()
    throw redirect(303, '/')
  }
}