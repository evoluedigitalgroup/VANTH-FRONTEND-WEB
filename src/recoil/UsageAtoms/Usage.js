import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const usageAtom = atom({
	key: "usageAtom",
	default: null,
	effects_UNSTABLE: [persistAtom],
});