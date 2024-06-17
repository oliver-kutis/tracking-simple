import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: 'dev.oliverkutis.blog',
		port: 80,
		fs: {
			allow: ['..'],
		},
		// proxy: {
		// 	'/sgtm': {
		// 		target: 'https://server-side-tagging-oliverkutisblog-3f5b72f3oq-lm.a.run.app',
		// 	},
		// },
	},
	// test: {
	// 	include: ['src/**/*.{test,spec}.{js,ts}']
	// }
});
