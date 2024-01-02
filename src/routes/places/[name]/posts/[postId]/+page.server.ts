export const load = async ({ locals: { supabase }, params }) => {
    const restaurantQuery = await supabase
        .from('restaurants')
        .select('id, name, logo_url')
        .eq('name', params.name.replace('-', ' '));

    const restaurant_id = restaurantQuery?.data?.[0]?.id;
    const restaurant_name = restaurantQuery?.data?.[0]?.name;
    const restaurant_logo = restaurantQuery?.data?.[0]?.logo_url;

    if (!restaurant_id) {
        console.error('Restaurant ID not found');
        return { post: null }; // or handle the scenario where restaurant_id is not found
    }

    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('restaurant_id', restaurant_id)
        .eq('id', BigInt(params.postId));

    if (error) {
        console.error(error);
        return;
    }

    console.log(post);
    
    return { post, restaurant_name, restaurant_logo };
};
