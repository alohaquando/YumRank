import { currentPlaceName } from '$lib/data/currentPlaceName.js';
import { json } from '@sveltejs/kit';
import qrCode from 'qrcode';

export const GET = async ({
	locals: { supabase, wss, getSession, userConnections },
	params,
	url
}) => {
	const session = await getSession();
	if (!session) {
		return json({ status: 500, body: 'error cuh' });
	}

	const { data: restaurant, error } = await supabase
		.from('restaurants')
		.select('*')
		.eq('name', params.name.replace('-', ' '));

	function getByValue(map: Map<string, WebSocket>, searchValue: any) {
		for (let [key, value] of map.entries()) {
			if (value === searchValue) return key;
		}
	}

	if (wss) {
		wss.clients.forEach((client: { readyState: number; send: (arg0: string) => void }) => {
			if (client.readyState === 1) {
				let resowner = (restaurant && restaurant[0])?.owner_id as string;
				console.log(userConnections);
				const ownerWs = userConnections?.get(resowner);
				let otherWs = [];
				for (let [key, value] of (userConnections ?? new Map()).entries()) {
					if (value !== ownerWs) {
						otherWs.push(value);
					}
				}

				let userIds: string[] = [];
				for (let ws of otherWs) {
					const userId = getByValue(userConnections ?? new Map<string, WebSocket>(), ws);
					if (userId) {
						userIds.push(userId);
					}
				}
				let qrData = {
					expirationTime: new Date(Date.now() + 2 * 60 * 1000).toISOString() // 2 minutes from now
				};

				qrCode.toDataURL(
					JSON.stringify(qrData),
					(err: any, qrDataURL: string) => {
						if (err) {
							client.send('Error generating QR code');
						} else {
							// Send the QR code to all clients except the owner
							if (client !== ownerWs) {
								client.send(qrDataURL);
								for (const userId of userIds) {
									ownerWs?.send(
										`${userId} want to leave a review for ${params.name.replace('-', ' ')}`
									);
								}
							}

							// Send the message only to the owner
							// if (ownerWs) ownerWs.send(`lol`);
						}
					}
				);
			}
		});
	}
	return json({ restaurant });
};



