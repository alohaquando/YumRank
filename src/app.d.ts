import { SupabaseClient, Session } from '@supabase/supabase-js';
import { Database } from './DatabaseDefinitions';

declare global {
	namespace App {
		interface Locals {
			wss?: ExtendedWebSocketServer;
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
			userConnections?: Map<string, WebSocket>;
		}
		interface PageData {
			session: Session | null;
			supabase: SupabaseClient;
		}
		// interface Error {}
		// interface Platform {}
	}
}

export {};
