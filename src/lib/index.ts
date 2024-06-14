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

function setCookie(name, value, days) {
	let expires = '';
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = '; expires=' + date.toUTCString();
	}
	document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

export function getCookie(name) {
	const nameEQ = name + '=';
	const ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

export function handleConsentUpdate(action: string) {
	if (action === 'accept') {
		setCookie('cookie-consent-analytics', 'accept', 365);
		gtag('consent', 'update', {
			functional_storage: 'granted',
			analytics_storage: 'granted',
			ad_storage: 'granted',
			ad_user_data: 'granted',
			ad_personalization: 'granted',
		});
	} else if (action === 'deny') {
		setCookie('cookie-consent-analytics', 'deny', 365);
		gtag('consent', 'update', {
			functional_storage: 'denied',
			analytics_storage: 'denied',
			ad_storage: 'denied',
			ad_user_data: 'denied',
			ad_personalization: 'denied',
		});
	}

	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ event: 'cookie_consent_update', action: action });
}

export function handleConsentDefault() {
	const consent = getCookie('cookie-consent-analytics');
	if (!consent || consent === 'deny') {
		// setCookie('cookie-consent-analytics', 'deny', 365);
		gtag('consent', 'default', {
			functional_storage: 'denied',
			analytics_storage: 'denied',
			ad_storage: 'denied',
			ad_user_data: 'denied',
			ad_personalization: 'denied',
		});
	} else if (consent === 'accept') {
		gtag('consent', 'default', {
			functional_storage: 'granted',
			analytics_storage: 'granted',
			ad_storage: 'granted',
			ad_user_data: 'granted',
			ad_personalization: 'granted',
		});
	}
}
