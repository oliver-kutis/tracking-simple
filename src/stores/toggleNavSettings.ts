// import type Nav from '$components/Nav.svelte';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

interface NavSettings {
	theme: boolean;
	nav: boolean;
}
const toggleNavSettings: Writable<NavSettings> = writable({
	theme: false,
	nav: false,
});

export default toggleNavSettings;
