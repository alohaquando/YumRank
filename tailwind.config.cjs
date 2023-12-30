/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: [
				'Inter',
				{
					fontFeatureSettings:
						'"cv09" , "cv08" , "cv06" , "cv02" , "cv04" , "cv01" , "cv11" , "cv03" , "cv05" , "case"'
				},
				'system-ui'
			]
		},
		fontMetrics: {
			Inter: {
				capHeight: 1490,
				ascent: 1984,
				descent: -494,
				unitsPerEm: 2048
			}
		},
		extend: {}
	},

	plugins: [require('tailwindcss-leading-trim')]
};

module.exports = config;
