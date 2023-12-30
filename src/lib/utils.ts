import type { SupabaseClient } from '@supabase/supabase-js';

export async function uploadAndGetPublicUrlFromSelected(supabase: SupabaseClient, file: File, bucket: string) {
	console.log(file);
	return new Promise<string[]>((resolve, reject) => {
		if (file.size === 0) {
			reject('You must select an image to upload.');
		} else {
			const bucketUrls: string[] = [];
			(async () => {

				const fileExt = file.name.split('.').pop();
				const fileName = `${(Math.random()).toString().split('.').pop()}.${fileExt}`;

				const { error } = await supabase.storage.from(bucket).upload(fileName, file);

				if (error) {
					reject(error);
				}

				const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
				bucketUrls.push(data.publicUrl);

				resolve(bucketUrls);
			})();
		}
	});
}

export async function uploadAndGetPublicUrlsFromSelected(supabase: SupabaseClient, files: File[], bucket: string) {
	console.log(files);
	return new Promise<string[]>((resolve, reject) => {
		if (files[0].size === 0) {
			reject('You must select an image to upload.');
		} else {
			const bucketUrls: string[] = [];
			(async () => {
				for (let i = 0; i < files.length; i++) {
					const file = files[i];
					const fileExt = file.name.split('.').pop();
					const fileName = `${(Math.random()).toString().split('.').pop()}.${fileExt}`;

					const { error } = await supabase.storage.from(bucket).upload(fileName, file);

					if (error) {
						reject(error);
					}

					const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
					bucketUrls.push(data.publicUrl);
				}
				resolve(bucketUrls);
			})();
		}
	});
}