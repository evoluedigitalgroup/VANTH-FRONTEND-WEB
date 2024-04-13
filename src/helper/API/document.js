import { api } from "../index";
import { PAGE_LIMIT } from "../../config";
import {
  DOCUMENT_LIST,
  APPROVED_DOCUMENT,
  GET_DOCUMENT_DETAIL,
  SUBMIT_DOCUMENT,
  APPROVE_ADDRESS_PROOF,
} from "../url";

export const getDocumentList = (page, search, limit = PAGE_LIMIT) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api(DOCUMENT_LIST, "post", {
        start: (page - 1) * limit,
        limit,
        search,
      });

      resolve(response.data);
    } catch (error) {
      reject();
    }
  });
};

export const approvedDocumentList = (submitData) => {
  return new Promise((resolve, reject) => {
    api(APPROVED_DOCUMENT, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};

export const getDocument = (submitData) => {
  return new Promise((resolve, reject) => {
    api(GET_DOCUMENT_DETAIL, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};

export const submitDocument = (submitData) => {
  return new Promise((resolve, reject) => {
    api(SUBMIT_DOCUMENT, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};

export const submitAddressDocument = (submitData) => {
  return new Promise((resolve, reject) => {
    api(APPROVE_ADDRESS_PROOF, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};
