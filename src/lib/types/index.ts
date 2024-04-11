import type { ComponentType } from 'svelte';

export type Post = {
	title: string;
	imrUrl: string;
	publishDate: string;
	editDate?: string;
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
	};
};
