import { readable } from 'svelte/store';

export const restaurantSrc = readable(
	'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
);
export const dishSrc = readable(
	'https://media.istockphoto.com/id/1422866960/photo/seared-foie-gras.webp?b=1&s=170667a&w=0&k=20&c=OE-eBOGn69F0eIUU1nsGN5JBiOfUDvvN2XqxWaZf8ag='
);
export const restaurantLogoSrc = readable(
	'https://images.unsplash.com/photo-1638339682391-8d94dbe130db?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
);
export const restaurantName = readable('Wasabi Bar by Morimoto');
export const dishName = readable('Ramen');
export const checkIns = readable(5489);
export const rating = readable(4.5);
export const favorites = readable(84);
export const href = readable('/');

export const userSrc = readable(
	'https://m.media-amazon.com/images/M/MV5BNDM1YjNkZjEtNTllMC00M2M3LTg4OGYtMjYyYTRmMzNjNjRjXkEyXkFqcGdeQXVyNDY5MjMyNTg@._V1_.jpg'
);
export const userFullName = readable('Lee Ik-jun');
