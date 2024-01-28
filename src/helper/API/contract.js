import { AfterAuthApi, ApiCall } from "../index";
import {
  CREATE_TEMPLATE,
  GENERATE_CONTRACT_LINK,
  GET_CONTRACT_DETAILS_LINK,
  GET_TEMPLATES,
  UPDATE_CONTRACT_STATUS_LINK
} from "../url";

export const createContract = (submitData) => {
  return new Promise((resolve, reject) => {
    AfterAuthApi(CREATE_TEMPLATE, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};


export const getTemplates = () => {
  return new Promise((resolve, reject) => {
    AfterAuthApi(GET_TEMPLATES, "post", {})
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};

export const generateContractLink = (submitData) => {
  return new Promise((resolve, reject) => {
    AfterAuthApi(GENERATE_CONTRACT_LINK, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};


export const getPublicContractDetails = (submitData) => {
  return new Promise((resolve, reject) => {
    AfterAuthApi(GET_CONTRACT_DETAILS_LINK, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};


export const updateContractStatus = (submitData) => {
  return new Promise((resolve, reject) => {
    AfterAuthApi(UPDATE_CONTRACT_STATUS_LINK, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};