import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ url, locals }) => {
  if (locals.wss) {
    locals.wss.clients.forEach((client: { readyState: number; send: (arg0: string) => void; }) => {
      if (client.readyState === 1) {
        client.send(`Hello from the GET handler at ${new Date().toLocaleString()}`);
      }
    });
  }
	return json({ success: true, message: 'Hello world from GET handler', url });
}) satisfies RequestHandler;