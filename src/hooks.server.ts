import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createServerClient } from '@supabase/ssr'
import type { Handle } from '@sveltejs/kit'
import type { ExtendedGlobal } from '$lib/server/webSocketUtils';
import { building } from '$app/environment';
import { GlobalThisWSS } from '$lib/server/webSocketUtils';

// This can be extracted into a separate file
let wssInitialized = false;
const userConnections = new Map();

function startupWebsocketServer(session: { user: { id: any; }; } | undefined) {
  if (!building) {
    if (wssInitialized) return;
    console.log('[wss:kit] setup');
    const wss = (globalThis as ExtendedGlobal)[GlobalThisWSS];
    if (wss !== undefined) {
      
      wss.on('connection', async (ws, request) => {
        // This is where you can authenticate the client from the request
        const userId = session?.user.id;
        userConnections.set(userId, ws);


        console.log(`[wss:kit] client connected (${ws.socketId})`);
        ws.send(`One user tryna check in (${ws.socketId})]`);
  
        ws.on('close', () => {
          console.log(`[wss:kit] client disconnected (${ws.socketId})`);
          userConnections.delete(userId);
        });
      });
      wssInitialized = true;
    }
  };
};

export const handle: Handle = (async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (key) => event.cookies.get(key),
        set: (key, value, options) => {
          event.cookies.set(key, value, options)
        },
        remove: (key, options) => {
          event.cookies.delete(key, options)
        }
      }
    }
  )
  

  /**
   * a little helper that is written for convenience so that instead
   * of calling `const { data: { session } } = await supabase.auth.getSession()`
   * you just call this `await getSession()`
   */
  event.locals.getSession = async () => {
    const {
      data: { session }
    } = await event.locals.supabase.auth.getSession()
    return session
  }

    const getSessionFromCookie = async () => {
      const { data: { session } } = await event.locals.supabase.auth.getSession();
      return session;
    }

    const session = await getSessionFromCookie();

    if (session) {
      const { user } = session;
      startupWebsocketServer({ user });
    }

    if (!building) {
      const wss = (globalThis as ExtendedGlobal)[GlobalThisWSS];
      if (wss !== undefined) {
        event.locals.wss = wss;
        event.locals.userConnections = userConnections;
  
      }
    }

    const response = await resolve(event, {
  		filterSerializedResponseHeaders: name => name === 'content-type',
  	});
  return response;
}) satisfies Handle;

