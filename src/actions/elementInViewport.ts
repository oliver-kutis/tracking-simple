interface ElemsInViewportParams extends IntersectionObserverInit {
	root?: Element | null;
	top?: number | undefined;
	bottom?: number | undefined;
}

export default function elementInViewport(node: Element, params: ElemsInViewportParams = {}) {
	let observer: IntersectionObserver;

	const handleIntersection = (entries: IntersectionObserverEntry[]) => {
		const eventName = entries[0].isIntersecting ? 'enterViewport' : 'leaveViewport';
		node.dispatchEvent(
			new CustomEvent(eventName, {
				detail: {
					intersectionRatio: entries[0].intersectionRatio,
				},
			}),
		);
	};

	const setOberver = (params: ElemsInViewportParams): void => {
		const { root, top, bottom } = params;
		const marginTop = top ? top * -1 : 0;
		const marginBottom = bottom ? bottom * -1 : 0;
		const rootMargin = `${marginTop}px 0px ${marginBottom}px 0px`;
		const options = { root, rootMargin };

		if (observer) observer.disconnect();
		observer = new IntersectionObserver(handleIntersection, options);
		observer.observe(node);
	};

	setOberver(params);

	return {
		update(params: ElemsInViewportParams): void {
			setOberver(params);
			console.log('leave');
		},
		destroy(): void {
			if (observer) observer.disconnect();
			console.log('destroyed');
		},
	};
}
