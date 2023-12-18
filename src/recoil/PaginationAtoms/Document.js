import { atom, selector, selectorFamily } from "recoil";
import { getDocumentList } from "../../helper/API/document";

export const documentActivePageAtom = atom({
	key: "documentActivePage",
	default: 1,
});

export const toReloadDocumentData = atom({
	key: "toReloadDocumentData",
	default: 0,
});

export const documentPaginationData = selectorFamily({
	key: "documentPaginationData",
	get:
		(search = null) =>
			async ({ get, set }) => {
				get(toReloadDocumentData);
				const currentPage = get(documentActivePageAtom);
				const apiData = await getDocumentList(currentPage, search);
				return apiData.data;
			},
});

export const documentPrevPageSelector = selector({
	key: "documentPrevPage",
	get: ({ get }) => {
		return get(documentActivePageAtom) == 1
			? null
			: get(documentActivePageAtom) - 1;
	},
});

export const documentNextPageSelector = selectorFamily({
	key: "documentNextPage",
	get:
		(totalPages) =>
			({ get }) => {
				return get(documentActivePageAtom) == totalPages && totalPages
					? null
					: get(documentActivePageAtom) + 1;
			},
});

export const documentShowFirstPageSelector = selector({
	key: "documentShowFirstPage",
	get: ({ get }) => {
		return get(documentActivePageAtom) == 1 ? false : true;
	},
});

export const documentShowLastPageSelector = selectorFamily({
	key: "documentShowLastPage",
	get:
		(totalPages) =>
			({ get }) => {
				return get(documentActivePageAtom) == totalPages && totalPages
					? false
					: true;
			},
});
