import TableOfContents from '$lib/components/TableOfContents.svelte';

export default function addTOC() {
	// const component = new TableOfContents({
	// 	target: document.querySelector('#post > h1:nth-of-type(2)'),
	// });
	const targetElement = document.querySelector('#post > h1:nth-of-type(2)');
	const container = document.createElement('div');

	if (targetElement && targetElement.parentNode) {
		targetElement.parentNode.insertBefore(container, targetElement.previousSibling);
	}

	new TableOfContents({
		target: container,
	});
}
