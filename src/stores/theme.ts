import { browser } from '$app/environment';
import { writable, get } from 'svelte/store';

interface ThemeStore<T> {
	subscribe: (callback: (value: T) => void) => () => void;
	set: (value: T) => void;
	update: (updater: (value: T) => T) => void;
}

const themeStore = <T>(key: string, initValue: T): ThemeStore<T> => {
	const store = writable<T>(initValue);
	const { subscribe, set, update } = store;
	if (!browser) return store;

	const storedValueStr = localStorage.getItem(key);
	if (storedValueStr != null) store.set(JSON.parse(storedValueStr));

	store.subscribe((val): void => {
		if (val == null) {
			localStorage.removeItem(key);
		} else {
			localStorage.setItem(key, JSON.stringify(val));
		}
	});

	window.addEventListener('storage', () => {
		const storedValueStr = localStorage.getItem(key);
		if (storedValueStr == null) return;

		const localValue = JSON.parse(storedValueStr);
		if (get(store) !== localValue) store.set(localValue);
	});

	document.querySelector('html')?.setAttribute('data-theme', get(store));

	return {
		subscribe,
		set,
		update,
	};
};

export default themeStore('theme', 'dark');
