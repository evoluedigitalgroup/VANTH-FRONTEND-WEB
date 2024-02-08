import { AfterAuthApi, ApiCall } from "../../helper";
import {
  CREATE_TEMPLATE,
  GENERATE_CONTRACT_LINK,
  GET_CONTRACTS,
  GET_CONTRACT_DETAILS_LINK,
  GET_TEMPLATES,
  UPDATE_CONTRACT_APPROVAL_STATUS_LINK,
  UPDATE_CONTRACT_STATUS_LINK
} from "../../helper/url";

//
export const getContractList = (page, search, limit = 10) => {
  return new Promise((resolve, reject) => {
    const submitData = {
      startFrom: (page - 1) * limit,
      totalFetchRecords: limit,
      search,
    };
    AfterAuthApi(GET_CONTRACTS, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};

//
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

// 
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

//
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

//
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

//
export const updateContractApprovalStatus = (submitData) => {
  return new Promise((resolve, reject) => {
    AfterAuthApi(UPDATE_CONTRACT_APPROVAL_STATUS_LINK, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
}