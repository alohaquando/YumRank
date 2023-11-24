/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Inter', { fontFeatureSettings: '"cv09" , "cv08" , "cv06" , "cv02" , "cv04" , "cv01" , "cv11" , "cv03" , "cv05" , "case"' }, 'system-ui']
		},
		extend: {}
	},

	plugins: []
};

module.exports = config;

