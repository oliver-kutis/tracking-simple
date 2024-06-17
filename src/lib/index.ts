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

export function dataLayerPush(event: string, data: object = {}) {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ event: event, ...data });
}

export function pageEngagementTracker() {
	let startEngage = new Date().getTime();
	let timeEngaged = 0;
	let idleTime = 0;
	let isIdle = true;
	let idleReport = false;
	let idleTimer, reportTimer;

	// Set the user as idle and calculate the time they were not idle
	const setIdle = () => {
		idleTime = new Date().getTime();
		timeEngaged += idleTime - startEngage;
		isIdle = true;
	};

	// Reset the 5 second idle timer. If the use was idle, start non-idle timer
	const pulse = () => {
		if (isIdle) {
			isIdle = false;
			startEngage = new Date().getTime();
			idleReport = false;
		}

		clearTimeout(idleTimer);
		idleTimer = setTimeout(setIdle, 5000);
	};

	// Utilify func for attaching event listeners
	const addListener = (evt, cb) => {
		if (window.addEventListener) {
			window.addEventListener(evt, cb);
		} else if (window.attachEvent) {
			window.attachEvent('on' + evt, cb);
		}
	};

	// Push event to dataLayer every 15 seconds unless the user is idle.
	// ... also, push an event when the iser leaves the page
	const report = evt => {
		if (!isIdle) {
			timeEngaged += new Date().getTime() - startEngage;
		}

		// Push the event to the dataLayer, push only valid time values
		if (!idleReport && timeEngaged > 0 && timeEngaged < 3600000) {
			dataLayerPush('page_engagement', { time_engaged: timeEngaged });
		}

		if (isIdle) {
			idleReport = true;
		}

		// overcome potential beforeunload event duplication
		if (evt && evt.type === 'beforeunload') {
			window.removeEventListener('beforeunload', report);
		}

		timeEngaged = 0;
		startEngage = new Date().getTime();
		reportTimer = setTimeout(report, 15000);
	};

	addListener('mousedown', pulse);
	addListener('keydown', pulse);
	addListener('scroll', pulse);
	addListener('mousemove', pulse);
	addListener('beforeunload', report);
	idleTimer = setTimeout(setIdle, 5000);
	reportTimer = setTimeout(report, 15000);
}
