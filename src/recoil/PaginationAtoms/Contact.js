import { atom, selector, selectorFamily } from "recoil";
import { getContactList } from "../../pages/Clients/api";

export const contactActivePageAtom = atom({
	key: "contactActivePage",
	default: 1,
});

export const toReloadContactData = atom({
	key: "toReloadContactData",
	default: 0,
});

export const contactPaginationData = selectorFamily({
	key: "contactPaginationData",
	get:
		({search = null, status = ""}) =>
			async ({ get, set }) => {
				get(toReloadContactData);
				const currentPage = get(contactActivePageAtom);
				const apiData = await getContactList(currentPage, search, status);
				return apiData.data;
			},
});

export const contactPrevPageSelector = selector({
	key: "contactPrevPage",
	get: ({ get }) => {
		return get(contactActivePageAtom) == 1
			? null
			: get(contactActivePageAtom) - 1;
	},
});

export const contactNextPageSelector = selectorFamily({
	key: "contactNextPage",
	get:
		(totalPages) =>
			({ get }) => {
				return get(contactActivePageAtom) == totalPages && totalPages
					? null
					: get(contactActivePageAtom) + 1;
			},
});

export const contactShowFirstPageSelector = selector({
	key: "contactShowFirstPage",
	get: ({ get }) => {
		return get(contactActivePageAtom) == 1 ? false : true;
	},
});

export const contactShowLastPageSelector = selectorFamily({
	key: "contactShowLastPage",
	get:
		(totalPages) =>
			({ get }) => {
				return get(contactActivePageAtom) == totalPages && totalPages
					? false
					: true;
			},
});
