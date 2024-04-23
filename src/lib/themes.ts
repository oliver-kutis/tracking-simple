import type { Theme } from './types/index.js';

export const themes: Theme[] = [
	{
		theme: 'dark',
		meta: {
			mode: 'dark',
			shikiTheme: 'min-dark',
		},
	},
	{
		theme: 'sunset',
		meta: {
			mode: 'dark',
			shikiTheme: 'vesper',
		},
	},
	{
		theme: 'night',
		meta: {
			mode: 'dark',
			shikiTheme: 'solarized-dark',
		},
	},
	{
		theme: 'synthwave',
		meta: {
			mode: 'dark',
			shikiTheme: 'synthwave-84',
		},
	},
	{
		theme: 'nord',
		meta: {
			mode: 'light',
			shikiTheme: 'nord',
		},
	},
	{
		theme: 'garden',
		meta: {
			mode: 'light',
			shikiTheme: 'min-light',
		},
	},
	{
		theme: 'valentine',
		meta: {
			mode: 'light',
			shikiTheme: 'red',
		},
	},
];
