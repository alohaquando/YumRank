import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession }, params }) => {

    const { data: posts, error } = await supabase
        .from('posts')
        .select('context, title, restaurant:restaurants(name)') 
        .eq('restaurant_id', params.name.replace('-', ' '));
        
    if (error) {
        console.error(error);
        return;
    }

    console.log(posts);
  
    return { posts };
};


