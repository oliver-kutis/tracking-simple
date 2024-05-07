import type { ComponentType } from 'svelte';

export type CardData = {
	mainHeading: {
		en: string;
		sk: string;
	};
	subHeadings: {
		en: string[];
		sk: string[];
	};
	subParagraphs: {
		en: string[];
		sk: string[];
	};
}[];

export type Post = {
	imgUrl: string;
	imgAlt: string;
	title: string;
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
export type Language = 'en' | 'sk';

// types/index.ts
declare global {
	interface Window {
		dataLayer?: object[];
	}
}
