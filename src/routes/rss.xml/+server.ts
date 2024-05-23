import type { Post, Language } from '$lib/types';
import { langConfigs } from '$lib/config';

export async function GET({ fetch, url }) {
	const lang = url.searchParams.get('lang') as Language;
	const response = await fetch(`api/posts?lang=${lang}`);
	const posts: Post[] = await response.json();

	const headers = { 'Content-Type': 'application/xml' };
	const xml = `
        <rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
        <channel>
            <title>${langConfigs[lang].title}</title>
            <description>${langConfigs[lang].description}</description>
            <link>https://oliverkutis.blog/${lang === 'sk' ? 'sk/' : ''}</link>
            <atom:link href="https://oliverkutis.blog/rss.xml" rel="self" type="application/rss+xml" />
            <language>${lang === 'sk' ? 'sk-sk' : 'en-gb'}</language>
            <category>Web analytics</category>
            ${posts
				.map(
					post => `
                <item>
                    <title>${post.title}</title>
                    <description>${post.summary}</description>
                    <link>https://oliverkutis.blog${post.slug}</link>
                    <guid>https://oliverkutis.blog${post.slug}</guid>
                    <pubDate>${new Date(post?.datePublished).toUTCString()}</pubDate>
                    <author>${langConfigs[lang].name}</author>
                    ${post.tags ? post.tags.map(tag => `<category>${tag}</category>`).join('') : ''}
                </item>
            `,
				)
				.join('')}
        </channel>
        </rss>`;

	return new Response(xml, { headers });
}
