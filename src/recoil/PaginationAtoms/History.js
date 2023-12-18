import { atom, selector, selectorFamily } from "recoil";
import { profileHistory } from "../../helper/API/Profile";

export const historyActivePageAtom = atom({
	key: "historyActivePage",
	default: 1,
});

export const toReloadHistoryData = atom({
	key: "toReloadHistoryData",
	default: 0,
});

export const historyPaginationData = selectorFamily({
	key: "historyPaginationData",
	get:
		(search = null) =>
			async ({ get, set }) => {
				get(toReloadHistoryData);
				const currentPage = get(historyActivePageAtom);
				const apiData = await profileHistory(currentPage, search);
				return apiData.data;
			},
});

export const historyPrevPageSelector = selector({
	key: "historyPrevPage",
	get: ({ get }) => {
		return get(historyActivePageAtom) == 1
			? null
			: get(historyActivePageAtom) - 1;
	},
});

export const historyNextPageSelector = selectorFamily({
	key: "historyNextPage",
	get:
		(totalPages) =>
			({ get }) => {
				return get(historyActivePageAtom) == totalPages && totalPages
					? null
					: get(historyActivePageAtom) + 1;
			},
});

export const historyShowFirstPageSelector = selector({
	key: "historyShowFirstPage",
	get: ({ get }) => {
		return get(historyActivePageAtom) == 1 ? false : true;
	},
});

export const historyShowLastPageSelector = selectorFamily({
	key: "historyShowLastPage",
	get:
		(totalPages) =>
			({ get }) => {
				return get(historyActivePageAtom) == totalPages && totalPages
					? false
					: true;
			},
});
