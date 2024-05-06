import type { Language } from '$lib/types';

export function load({ url }) {
	let lang: Language = <Language>url.pathname.split('/')[1];
	if (lang !== 'sk') {
		lang = 'en';
	}
	return {
		url: url.pathname,
		lang,
	};
}
