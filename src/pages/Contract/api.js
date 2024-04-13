import { api } from "../../helper";
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
    api(GET_CONTRACTS, "post", submitData)
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
    api(CREATE_TEMPLATE, "post", submitData)
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
    api(GET_TEMPLATES, "post", {})
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
    api(GENERATE_CONTRACT_LINK, "post", submitData)
      .then((res) => {
        console.log(res.data)
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
    console.log('sended data : ', submitData)
    api(GET_CONTRACT_DETAILS_LINK, "post", submitData)
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
    api(UPDATE_CONTRACT_APPROVAL_STATUS_LINK, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
}