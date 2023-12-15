import { json } from '@sveltejs/kit';
import qrCode from 'qrcode';

export const GET = async ({ locals: { supabase, wss, getSession }, params, url }) => {
  const session = await getSession();
  if (!session) {
    return json({ status: 500, body: "error cuh" });
  }

    if (wss) {
      wss.clients.forEach((client: { readyState: number; send: (arg0: string) => void; }) => {
        if (client.readyState === 1) {
          qrCode.toDataURL(`https://localhost:5173/places/${params.name}/create-review`, (err: any, qrDataURL: string) => {
            if (err) {
              client.send('Error generating QR code');
            } else {
              client.send(qrDataURL);

            }
  
          });
        }
      });
    }
    return json({ success: true, message: 'Hello world from GET handler', url });
  
  }