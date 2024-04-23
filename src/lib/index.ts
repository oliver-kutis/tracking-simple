import { themes } from '$lib/themes';

export function getThemeType(theme: string) {
	const themeType = themes.find(t => t.theme === theme)?.meta.mode;
	return themeType || 'light';
}

export function isNordOrValentine(theme: string) {
	return theme === 'nord' || theme === 'valentine';
}
