import { themes } from '$lib/themes';
import type { ArrayOfHeadings, Heading } from './types';

export function getThemeType(theme: string) {
	const themeType = themes.find(t => t.theme === theme)?.meta.mode;
	return themeType || 'light';
}

export function isNordOrValentine(theme: string) {
	return theme === 'nord' || theme === 'valentine';
}

export function extractHeadings(arr: ArrayOfHeadings) {
	const headings = Array.from(document.querySelectorAll('h1[id], h2[id]'));
	const obj: Heading[] = [];
	let currentHeading: Heading = {
		headingProps: {
			tagName: null,
			id: null,
			text: null,
			href: null,
		},
		children: [],
	};
	let currentLevel = 1;

	headings.forEach((heading, index) => {
		const level = parseInt(heading.tagName.slice(1));

		if (level <= currentLevel) {
			currentLevel = level;
			currentHeading = {
				headingProps: {
					tagName: heading.tagName,
					id: heading.id,
					text: heading.textContent,
					href: heading.querySelector('a')?.href ?? null,
				},
				children: [],
			};

			obj[index] = currentHeading;
		} else if (currentHeading && level === currentLevel + 1) {
			currentHeading.children[index] = {
				headingProps: {
					tagName: heading.tagName,
					text: heading.textContent,
					id: heading.id,
					href: heading.querySelector('a')?.href ?? null,
				},
				children: [],
			};
		} else if (currentHeading && level > currentLevel + 1) {
			let parent = Object.values(currentHeading.children).slice(-1)[0];
			if (!parent) {
				parent = currentHeading;
			}
			parent.children[index] = {
				headingProps: {
					tagName: heading.tagName,
					id: heading.id,
					text: heading.textContent,
					href: heading.querySelector('a')?.href ?? null,
				},
				children: [],
			};
		}
	});

	arr = Object.entries(obj);

	return arr;
}
