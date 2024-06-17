import type { Handle, HandleFetch } from '@sveltejs/kit';

const SERVER_CONTAINER_URL = 'https://server-side-tagging-oliverkutisblog-3f5b72f3oq-lm.a.run.app';
const PROXY_PATH = '/sgtm';
const SGTM_DEBUG_HASH = 'ZW52LTN8VHBNZTdfRTJITnZ0a0g5U0c2Vlkzd3wxOTAyNDllMjkwNWM4ODQ3M2RmZTk=';

// export const handleFetch: HandleFetch = async ({ event, request, fetch }): Promise<Response> => {
// 	// intercept requests to the SGTM proxy path
// 	console.dir('Handling SGTM Proxy Request');
// 	console.dir(request);
// 	console.dir(JSON.stringify(request.url));
// 	if (request.url.pathname.startsWith(PROXY_PATH)) {
// 		// strip the PROXY_PATH from the request path
// 		const strippedPath = request.url.pathname.substring(PROXY_PATH.length);

// 		// build the new URL path with the SGTM conteiner URL, the stripped path and the query string
// 		const urlPath = `${SERVER_CONTAINER_URL}${strippedPath}${request.url.search}`;
// 		const proxiedUrl = new URL(urlPath);

// 		// Strip off header added by SvelteKit yet forbidden by underlying HTTP request
// 		// library `undici`.
// 		//

// 		// Forward the original request method and body
// 		const response = await fetch(proxiedUrl.toString(), {
// 			method: request.method,
// 			body: request.body,
// 			headers: request.headers,
// 		});

// 		return response;
// 	}
// };
const handleSgtmProxy: Handle = async ({ event }) => {
	// const origin = event.request.headers.get('origin');
	// console.dir('Origin');
	// console.dir(origin);
	// // reject foreign requests
	// if (!origin || new URL(origin).origin !== event.url.origin) {
	// 	throw new Error('403', 'Request Forbidden');
	// }
	// strip the PROXY_PATH from the request path
	const strippedPath = event.url.pathname.substring(PROXY_PATH.length);
	console.dir('Stripped Path');
	console.dir(strippedPath);

	// build the new URL path with the SGTM conteiner URL, the stripped path and the query string
	const urlPath = `${SERVER_CONTAINER_URL}${strippedPath}${event.url.search}`;
	const proxiedUrl = new URL(urlPath);
	console.dir('Proxied URL');
	console.dir(proxiedUrl.toString());

	// Strip off header added by SvelteKit yet forbidden by underlying HTTP request
	// library `undici`.
	// https://github.com/nodejs/undici/issues/1470
	event.request.headers.delete('connection');

	return fetch(proxiedUrl.toString(), {
		// Forward the original request method and body
		method: event.request.method,
		body: event.request.body,
		headers: {
			'X-Gtm-Server-Preview': SGTM_DEBUG_HASH,
			...event.request.headers,
		},
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
	// console.log('------ Request URL ------');
	// console.log(event.request.url);
	// intercept requests to the SGTM proxy path
	if (event.url.pathname.startsWith(PROXY_PATH)) {
		return await handleSgtmProxy({ event });
	}

	const response = await resolve(event);
	return response;
};

// src/hooks.server.ts
// import type { Handle } from '@sveltejs/kit';

// export const handle: Handle = async ({ event, resolve }) => {
// 	if (event.url.pathname.startsWith(PROXY_PATH)) {
// 		console.dir('Handling SGTM Proxy Request');
// 		// intercept requests to the SGTM proxy path
// 		// return await handleSgtmProxy({ event });
// 	}
// 	// Attach id to locals
// 	event.locals.requestId = '1234';
// 	console.dir('Event');
// 	console.dir(event);
// 	const response = await resolve(event);

// 	console.dir('Response');
// 	console.dir(response);
// 	return response;
// };
