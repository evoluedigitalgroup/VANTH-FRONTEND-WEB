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

export const contractTableData = atom({
  key: "contractTableData",
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

export const contractSelectedUser = atom({
  key: "contractSelectedUserAtom",
  default: null,
});

export const contractSelectedUsers = atom({
  key: "contractSelectedUsersAtom",
  default: [],
});

export const contractSelectedFiles = atom({
  key: "contractSelectedFilesAtom",
  default: null,
});

export const contractNewFileSelected = atom({
  key: "contractNewFileSelectedAtom",
  default: null,
});

export const contractModels = atom({
  key: "contractModelsAtom",
  default: {
    selectClient: null,
    selectTemplate: null,
    previewContract: null,
    pdfEditor: null,
    reviewTemplateSelect: null,
    contractReview: null,
  },
});

export const afterAuthRedirect = atom({
  key: "afterAuthRedirect",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const showTutorialAtom = atom({
  key: "showTutorial",
  default: {
    run: false,
    index: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
