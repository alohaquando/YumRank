import { json } from '@sveltejs/kit';
import qrCode from 'qrcode';

export const GET = async ({ locals: { supabase, wss, getSession, userConnections }, params, url }) => {
  const session = await getSession();
  if (!session) {
    return json({ status: 500, body: "error cuh" });
  }

  const { data: restaurant, error } = await supabase
  .from('restaurants')
  .select('*')
  .eq('name', params.name.replace('-', ' '));

    if (wss) {
      wss.clients.forEach((client: { readyState: number; send: (arg0: string) => void; }) => {
        if (client.readyState === 1) {
       
        let resownern = (restaurant && restaurant[0])?.owner_id as string;
        console.log(userConnections);
        const ownerWs = userConnections?.get(resownern);
        // const ownerSocket = new WebSocket(ownerWs);
        qrCode.toDataURL(`localhost:5173/places/${params.name}/create-review`, (err: any, qrDataURL: string) => {
          if (err) {
            client.send('Error generating QR code');
          } else {
            client.send(qrDataURL);
            if (ownerWs) ownerWs.send('lol');
          }
        });
        }
      });
    }
    return json({ userId: session.user.id });
  }