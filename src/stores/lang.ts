import { browser } from '$app/environment';
import { writable, get } from 'svelte/store';

interface LangStore<T> {
	subscribe: (callback: (value: T) => void) => () => void;
	set: (value: T) => void;
	update: (updater: (value: T) => T) => void;
}

const langStore = <T>(key: string, initValue: T): LangStore<T> => {
	const store = writable<T>(initValue);
	const { subscribe, set, update } = store;
	if (!browser) return store;

	const storedValueStr = localStorage.getItem(key);
	if (storedValueStr != null) store.set(JSON.parse(storedValueStr));

	store.subscribe((val: T): void => {
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

	document.querySelector('html')?.setAttribute('data-theme', get(store) as string);

	return {
		subscribe,
		set,
		update,
	};
};

export default langStore('lang', 'en');
