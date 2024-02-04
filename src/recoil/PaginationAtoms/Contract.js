import { atom, selector, selectorFamily } from "recoil";
import { getContractList } from "../../pages/Contract/api";

export const contractActivePageAtom = atom({
	key: "contractActivePage",
	default: 1,
});

export const toReloadContractData = atom({
	key: "toReloadContractData",
	default: 0,
});

export const contractPaginationData = selectorFamily({
	key: "contractPaginationData",
	get:
		(search = null) =>
			async ({ get, set }) => {
				get(toReloadContractData);
				const currentPage = get(contractActivePageAtom);
				const apiData = await getContractList(currentPage, search);
				return apiData.data;
			},
});

export const contractPrevPageSelector = selector({
	key: "contractPrevPage",
	get: ({ get }) => {
		return get(contractActivePageAtom) == 1
			? null
			: get(contractActivePageAtom) - 1;
	},
});

export const contractNextPageSelector = selectorFamily({
	key: "contractNextPage",
	get:
		(totalPages) =>
			({ get }) => {
				return get(contractActivePageAtom) == totalPages && totalPages
					? null
					: get(contractActivePageAtom) + 1;
			},
});

export const contractShowFirstPageSelector = selector({
	key: "contractShowFirstPage",
	get: ({ get }) => {
		return get(contractActivePageAtom) == 1 ? false : true;
	},
});

export const contractShowLastPageSelector = selectorFamily({
	key: "contractShowLastPage",
	get:
		(totalPages) =>
			({ get }) => {
				return get(contractActivePageAtom) == totalPages && totalPages
					? false
					: true;
			},
});
