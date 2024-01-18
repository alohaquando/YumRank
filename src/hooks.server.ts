import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createServerClient } from '@supabase/ssr';
import type { Handle } from '@sveltejs/kit';
import type { ExtendedGlobal } from '$lib/server/webSocketUtils';
import { building } from '$app/environment';
import { GlobalThisWSS } from '$lib/server/webSocketUtils';
import { parse } from 'cookie';

// This can be extracted into a separate file
let wssInitialized = false;
export const userConnections = new Map();

export const handle: Handle = (async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			get: (key) => event.cookies.get(key),
			set: (key, value, options) => {
				event.cookies.set(key, value, options);
			},
			remove: (key, options) => {
				event.cookies.delete(key, options);
			}
		}
	});
	// ...

	/**
	 * a little helper that is written for convenience so that instead
	 * of calling `const { data: { session } } = await supabase.auth.getSession()`
	 * you just call this `await getSession()`
	 */
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	startupWebsocketServer();

	if (!building) {
		const wss = (globalThis as ExtendedGlobal)[GlobalThisWSS];
		if (wss !== undefined) {
			event.locals.wss = wss;
			event.locals.userConnections = userConnections;
		}
	}

	const response = await resolve(event, {
		filterSerializedResponseHeaders: (name) => name === 'content-type'
	});
	return response;
}) satisfies Handle;

function startupWebsocketServer() {
	if (!building) {
		if (wssInitialized) return;
		console.log('[wss:kit] setup');
		const wss = (globalThis as ExtendedGlobal)[GlobalThisWSS];

		if (wss !== undefined) {
			wss.on('connection', async (ws, request) => {
				const cookie = request.headers.cookie;
				const decodedCookie = cookie ? parse(cookie) : null;
				const token = decodedCookie?.['sb-spkuounwjckbvmdirseo-auth-token'];
				const parsedToken = token ? JSON.parse(token) : null;
				const userId = parsedToken?.user.id;

				if (userConnections.has(userId)) {
					// Close the new connection
					const existingWs = userConnections.get(userId);
					existingWs.close();
				}

				userConnections.set(userId, ws);

				console.log(`[wss:kit] client connected (${ws.socketId})`);

				ws.on('close', () => {
					console.log(`[wss:kit] client disconnected (${ws.socketId})`);
					userConnections.delete(userId);
				});
			});
			wssInitialized = true;
		}
	}
}
