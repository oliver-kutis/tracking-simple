import type { Language, Post } from '$lib/types';
import type { LayoutLoad } from './$types.js';

export const load: LayoutLoad = async ({ fetch, url }) => {
	// Get the language from the URL
	let lang: Language = <Language>url.pathname.split('/')[1];
	if (lang !== 'sk') {
		lang = 'en';
	}
	// Get the posts from the API
	let apiURL = `api/posts?lang=${lang}`;
	try {
		apiURL = lang === 'sk' ? '../../' + apiURL : apiURL;
		const response = await fetch(apiURL);
		const posts: Post[] = await response.json();

		const layoutData = {
			lang,
			posts,
		};

		return layoutData;
	} catch (error) {
		console.log(`Error: ${error}`);
		return {
			lang,
			posts: [],
		};
	}
};
