import { AfterAuthApi, ApiCall } from "../index";
import {
  DOCUMENT_LIST,
  APPROVED_DOCUMENT,
  GET_DOCUMENT_DETAIL,
  SUBMIT_DOCUMENT,
  APPROVE_ADDRESS_PROOF,
} from "../url";

export const getDocumentList = (page, search, limit = 10) => {
  return new Promise((resolve, reject) => {
    const submitData = {
      startFrom: (page - 1) * limit,
      totalFetchRecords: limit,
      search,
    };
    AfterAuthApi(DOCUMENT_LIST, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};

export const approvedDocumentList = (submitData) => {
  return new Promise((resolve, reject) => {
    AfterAuthApi(APPROVED_DOCUMENT, "post", submitData)
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
    ApiCall(GET_DOCUMENT_DETAIL, "post", submitData)
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
    ApiCall(SUBMIT_DOCUMENT, "post", submitData)
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
    ApiCall(APPROVE_ADDRESS_PROOF, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};
