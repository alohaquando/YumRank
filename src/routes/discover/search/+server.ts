import { json } from '@sveltejs/kit';

export async function GET({
  locals: { supabase }, // Destructure 'supabase' from locals
  params,
  url
}) {
    const q = url.searchParams.get('q');
    console.log(q);
  
  try {
    let searchResults;

    if (q) {
      // Perform a search query against your database
      const { data: search, error } = await supabase
        .from('restaurants')
        .select()
        .ilike('name', `%${q}%`);

      if (error) {
        throw new Error('Error fetching search results');
      }

      searchResults = search;
    } else {
      // If 'q' is null, select all restaurants
      const { data: allRestaurants, error } = await supabase
        .from('restaurants')
        .select('*');


      if (error) {
        throw new Error('Error fetching all restaurants');
      }

      searchResults = allRestaurants;
    }

    return json(searchResults);
  } catch (error) {
    console.error(error);
    return json(error); // Return error message with status code 500
  }
}
