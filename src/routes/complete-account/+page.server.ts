import { fail, redirect } from '@sveltejs/kit';
import { deleteFromBucket, uploadAndGetPublicUrlFromSelected, uploadAndGetPublicUrlsFromSelected } from '$lib/server/utils';


export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select(`username, full_name, avatar_url`)
		.eq('id', session.user.id)
		.single();

	return { session, profile };
};

export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const fullName = formData.get('fullName') as string;
		const username = formData.get('username') as string;
		const avatarUrl = formData.get('avatar_url') as File;


		const session = await getSession();

		const { data: profile } = await supabase
			.from('profiles')
			.select(`username, full_name, avatar_url`)
			.eq('id', session?.user.id)
			.single();

		const oldAvatar = profile?.avatar_url;

		let avatar: string | string[] = [];
		
		if (oldAvatar) {
			if (avatarUrl && avatarUrl.type !== 'application/octet-stream') {
				avatar = await uploadAndGetPublicUrlFromSelected(supabase, avatarUrl, 'avatars');
				const [, , , , , , , , filename] = oldAvatar.split('/');
				await deleteFromBucket(supabase, 'avatars', filename);
			}
		} else {
			if (avatarUrl && avatarUrl.type !== 'application/octet-stream') {
				avatar = await uploadAndGetPublicUrlFromSelected(supabase, avatarUrl, 'avatars');
			}
		}

		const upsertData = {
            id: session?.user.id,
			full_name: fullName,
			username,
			avatar_url: Array.isArray(avatar) ? avatar[0] : undefined,
			updated_at: new Date()
        };

		const { error } = await supabase.from('profiles').upsert(upsertData);

		const update = await supabase.auth.updateUser({
			data: {
				user_name: username,
				avatar_url: avatarUrl
			}
		});

		if (error) {
			console.log(error);

            return fail(500, {
                failed: true,
                message: `${error.message}`
            });
		} else {
			throw redirect(303, '/me');
		}
	}
};
