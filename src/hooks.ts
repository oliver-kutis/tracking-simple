import type { Handle } from '@sveltejs/kit';

const SERVER_CONTAINER_URL = 'https://server-side-tagging-oliverkutisblog-3f5b72f3oq-lm.a.run.app';
const PROXY_PATH = '/sgtm';

const handleSgtmProxy: Handle = async ({ event }) => {
	const origin = event.request.headers.get('origin');
	console.log('Origin');
	console.log(origin);
	// reject foreign requests
	if (!origin || new URL(origin).origin !== event.url.origin) {
		throw new Error('403', 'Request Forbidden');
	}
	// strip the PROXY_PATH from the request path
	const strippedPath = event.url.pathname.substring(PROXY_PATH.length);
	console.log('Stripped Path');
	console.log(strippedPath);

	// build the new URL path with the SGTM conteiner URL, the stripped path and the query string
	const urlPath = `${SERVER_CONTAINER_URL}${strippedPath}${event.url.search}`;
	const proxiedUrl = new URL(urlPath);
	console.log('Proxied URL');
	console.log(proxiedUrl);

	// Strip off header added by SvelteKit yet forbidden by underlying HTTP request
	// library `undici`.
	// https://github.com/nodejs/undici/issues/1470
	event.request.headers.delete('connection');

	return fetch(proxiedUrl.toString(), {
		// Forward the original request method and body
		method: event.request.method,
		body: event.request.body,
		headers: event.request.headers,
	})
		.then(res => {
			return res;
		})
		.catch(error => {
			console.error('Error:', error);
			throw error;
		});
};

export const handle: Handle = async ({ event, resolve }) => {
	console.log('Event');
	console.log(JSON.stringify(event));
	console.log('Event URL');
	console.log(event.url);
	// intercept requests to the SGTM proxy path
	if (event.url.pathname.startsWith(PROXY_PATH)) {
		console.log('Handling SGTM Proxy Request');
		console.log(event.request);
		const res = await handleSgtmProxy({ event });
		// const resolved = await resolve(res);
		console.log('SGTM Proxy Response');
		console.log(res);
		return res;
	}

	return await resolve(event);
};

// src/hooks.server.ts
// import type { Handle } from '@sveltejs/kit';

// export const handle: Handle = async ({ event, resolve }) => {
// 	if (event.url.pathname.startsWith(PROXY_PATH)) {
// 		console.log('Handling SGTM Proxy Request');
// 		// intercept requests to the SGTM proxy path
// 		// return await handleSgtmProxy({ event });
// 	}
// 	// Attach id to locals
// 	event.locals.requestId = '1234';
// 	console.log('Event');
// 	console.log(event);
// 	const response = await resolve(event);

// 	console.log('Response');
// 	console.log(response);
// 	return response;
// };
