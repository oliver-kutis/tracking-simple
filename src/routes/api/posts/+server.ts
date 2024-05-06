import { json } from '@sveltejs/kit';
import type { Post, Language } from '$lib/types';

async function getPosts(lang: Language) {
	let posts: Post[] = [];

	let paths;
	if (lang === 'sk') {
		paths = import.meta.glob('/src/posts/sk/*.md', { eager: true });
	} else {
		paths = import.meta.glob('/src/posts/*.md', { eager: true });
	}

	for (const path in paths) {
		const file = paths[path];
		const slug =
			`${lang === 'sk' ? '/sk' : ''}` + '/blog/' + path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			const post = { ...metadata, slug } satisfies Post;
			post.published && posts.push(post);
		}
	}

	posts = posts.sort(
		(first, second) =>
			new Date(second.publishDate).getTime() - new Date(first.publishDate).getTime(),
	);

	return posts;
}

export async function GET({ url }) {
	const lang: Language = url.searchParams.get('lang') as Language;

	const posts = await getPosts(lang);

	return json(posts);
}
