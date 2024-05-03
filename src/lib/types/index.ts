import type { ComponentType } from 'svelte';

export type Post = {
	imgUrl: string;
	title: string;
	imrUrl: string;
	datePublished: string;
	dateEdited?: string;
	published: boolean;
	summary: string;
	tags?: string[];
	slug?: string;
};
export type MarkdownPost = {
	// metadata: {
	// 	title: string;
	// 	imrUrl: string;
	// 	publishDate: string;
	// 	editDate?: string;
	// 	published: boolean;
	// 	summary: string;
	// 	tags?: string[];
	// };
	metadata: Post;
	default: ComponentType;
};

export type Theme = {
	theme: string;
	meta: {
		mode: string;
		shikiTheme: string;
	};
};

export type Heading = {
	headingProps: {
		tagName: string | null;
		id: string | null;
		text: string | null;
		href: string | null;
	};
	children: Heading[];
};

export type ArrayOfHeadings = [string, Heading][];
