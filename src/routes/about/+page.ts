import type { MarkdownPost } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const introText: MarkdownPost = await import(`../../about/intro.md`);
	const workText: MarkdownPost = await import(`../../about/work.md`);

	return {
		work: workText.default,
		intro: introText.default,
	};
};
