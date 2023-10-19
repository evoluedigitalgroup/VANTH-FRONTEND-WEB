import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const loginAtom = atom({
	key: "login", // unique ID (with respect to other atoms/selectors)
	default: null, // default value (aka initial value)
	effects_UNSTABLE: [persistAtom],
});

export const jwtAtom = atom({
	key: "jwt",
	default: "",
	effects_UNSTABLE: [persistAtom],
});

export const profileAtom = atom({
	key: "profileAtom",
	default: "",
	effects_UNSTABLE: [persistAtom],
});

export const contactTableData = atom({
	key: "contactTableData",
	default: "",
	effects_UNSTABLE: [persistAtom],
});

export const documentTableData = atom({
	key: "documentTableData",
	default: "",
	effects_UNSTABLE: [persistAtom],
});

export const getAllChartData = atom({
	key: "getAllChartData",
	default: null,
	effects_UNSTABLE: [persistAtom],
});
