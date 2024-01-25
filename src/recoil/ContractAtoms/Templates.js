import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const templatesListAtom = atom({
	key: "templatesList",
	default: [],
	effects_UNSTABLE: [persistAtom],
});


export const selectedTemplatesAtom = atom({
	key: "selectedTemplates",
	default: [],
	effects_UNSTABLE: [persistAtom],
});