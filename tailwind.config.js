/** @type {import('tailwindcss').Config} */
import { themes as daisyThemes } from './src/lib/themes.ts';
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './src/compontents/**/*.svelte'],
	theme: {
		backgroundImage: {
			image: "url('./src/lib/img/background-main.jpg')",
			'bg-alt': "url('./src/lib/img/bg-alt.jpg')",
		},

		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				montserrat: ['Montserrat', 'sans-serif'],
				roboto: ['Roboto', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif'],
				lexend: ['Lexend', 'sans-serif'],
			},
			backgroundImage: {
				clouds: "url('/src/lib/img/bg-clouds.jpg');",
			},
			colors: {
				card: '#024269',
			},
		},
	},
	plugins: [
		require('daisyui'),
		require('tailwind-scrollbar'),
		require('@tailwindcss/typography'),
	],
	daisyui: {
		// styled: true,
		themes: [
			// 'sunset',
			// 'dark',
			// 'cyberpunk',
			// 'cupcake',
			...daisyThemes.map(themeObj => themeObj.theme),
			{
				darkTheme: {
					primary: '#020024',
					secondary: '#907900',
					card: '#213a5f',
					accent: '#00D4FF',
					// accent: '#007a8a',
					// accent: '#0281a8',
					neutral: '#020a02',
					// 'base-100': '#1a1a1a',
					'base-100': '#020024',
					info: '#009eb5',
					success: '#00a064',
					warning: '#ff9200',
					error: '#ff759f',
				},
				mytheme: {
					primary: '#ff9200',
					secondary: '#907900',
					accent: '#00D4FF',
					neutral: '#020a02',
					'base-100': '#111827',
					info: '#009eb5',
					success: '#00a064',
					warning: '#ff9200',
					error: '#ff759f',
				},
			},
		],
	},
};
