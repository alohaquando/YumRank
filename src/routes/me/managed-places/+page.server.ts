export const load = async ({ parent }) => {
	const { myPlaces } = await parent();
	return { myPlaces };
};
