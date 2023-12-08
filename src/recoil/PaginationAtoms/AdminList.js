import { atom, selector, selectorFamily } from "recoil";
import { permissonTable } from "../../helper/API/Permisson";

export const adminActivePageAtom = atom({
	key: "adminActivePage",
	default: 1,
});

export const toReloadAdminData = atom({
	key: "toReloadAdminData",
	default: 0,
});

export const adminPaginationData = selectorFamily({
	key: "adminPaginationData",
	get:
		(search = null) =>
		async ({ get, set }) => {
			get(toReloadAdminData);
			const currentPage = get(adminActivePageAtom);
			const apiData = await permissonTable(currentPage, search);
			console.log("apiData", apiData);
			return apiData.data;
		},
});

export const adminPrevPageSelector = selector({
	key: "adminPrevPage",
	get: ({ get }) => {
		return get(adminActivePageAtom) == 1
			? null
			: get(adminActivePageAtom) - 1;
	},
});

export const adminNextPageSelector = selectorFamily({
	key: "adminNextPage",
	get:
		(totalPages) =>
		({ get }) => {
			return get(adminActivePageAtom) == totalPages && totalPages
				? null
				: get(adminActivePageAtom) + 1;
		},
});

export const adminShowFirstPageSelector = selector({
	key: "adminShowFirstPage",
	get: ({ get }) => {
		return get(adminActivePageAtom) == 1 ? false : true;
	},
});

export const adminShowLastPageSelector = selectorFamily({
	key: "adminShowLastPage",
	get:
		(totalPages) =>
		({ get }) => {
			return get(adminActivePageAtom) == totalPages && totalPages
				? false
				: true;
		},
});
