import { fail, redirect } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession()

  if (!session) {
    throw redirect(303, '/')
  }


  return { session }
}

export const actions = {
    create: async ({ request, locals: { supabase, getSession } }) => {
      const formData = await request.formData()
      const name = formData.get('name') as string
      const logoUrl = formData.get('logoUrl') as string
      const address = formData.get('address') as string
      const description = formData.get('description') as string
      const restaurantImages = formData.getAll('restaurantImages') as string[]
      const menuImages = formData.getAll('menuImages') as string[]

  
      const { error } = await supabase.from('restaurants').insert({
        name: name,
        logo_url: logoUrl,
        address: address,
        is_verified: false,
        description: description,
        res_images: restaurantImages,
        menu_images: menuImages,
        created_at: new Date(),
      })

      console.log(logoUrl)
      console.log(restaurantImages)
  
      if (error) {
        return fail(500, {
          name,
          logoUrl,
          address,
          description,
          restaurantImages,
          menuImages,
        })
      } 
    },
  }