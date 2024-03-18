/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		backgroundImage: {
			image: "url('./src/lib/img/background-main.jpg')",
			'bg-alt': "url('./src/lib/img/bg-alt.jpg')",
		},
		extend: {},
	},
	plugins: [require('daisyui')],
	daisyui: {
		// styled: true,
		themes: [
			{
				darkTheme: {
					primary: '#020024',
					secondary: '#907900',
					// accent: '#00D4FF',
					accent: '#0281a8',
					neutral: '#020a02',
					// 'base-100': '#1a1a1a',
					'base-100': '#020024',
					info: '#009eb5',
					success: '#00a064',
					warning: '#ff9200',
					error: '#ff759f',
				},
				lightTheme: {
					primary: '#00D4FF',
					secondary: '#907900',
					accent: '#007a8a',
					neutral: '#020a02',
					'base-100': '#fff6ff',
					info: '#009eb5',
					success: '#00a064',
					warning: '#ff9200',
					error: '#ff759f',
				},
			},
		],
	},
};
