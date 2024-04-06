import type { ComponentType } from 'svelte';

export type MarkdownPost = {
	metadata: {
		title: string;
		imrUrl: string;
		publishedAt: string;
		summary: string;
		tags: string[];
	};
	// content: string
	default: ComponentType;
};

export type Theme = {
	theme: string;
	meta: {
		mode: string;
	};
};
