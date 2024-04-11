// import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { MarkdownPost } from '../../../lib/types';

export const load: PageLoad = async ({ params }) => {
	const slug = params.slug;

	const markdownPost: MarkdownPost = await import(`../../../posts/${slug}.md`);

	return {
		metadata: markdownPost.metadata,
		// content: markdownPost.content
		post: markdownPost.default,
	};
};
