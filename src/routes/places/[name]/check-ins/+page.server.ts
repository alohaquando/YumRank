export const load = async ({ parent }) => {
	const { checkIns } = await parent();
	return { checkIns };
};
