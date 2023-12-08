import { AfterAuthApi, ApiCall } from "../index";
import {
  GET_CONTACT,
  GENERATE_LINK,
  CONTACT_FORM,
  GENERATE_NEW_LINK,
  ATTACH_DOCUMENT,
  APPROVE_VISITOR,
  GET_ALL_DOCUMENTS_LIST,
} from "../url";

export const getContactList = (page, search, limit = 10) => {
  return new Promise((resolve, reject) => {
    const submitData = {
      startFrom: (page - 1) * limit,
      totalFetchRecords: limit,
      search,
    };
    AfterAuthApi(GET_CONTACT, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};

export const generateLink = (submitData) => {
  return new Promise((resolve, reject) => {
    AfterAuthApi(GENERATE_LINK, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};

export const contactForm = (submitData) => {
  // console.log("submitData", submitData);
  return new Promise((resolve, reject) => {
    ApiCall(CONTACT_FORM, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};

export const generateNewLink = (submitData) => {
  return new Promise((resolve, reject) => {
    AfterAuthApi(GENERATE_NEW_LINK, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};

export const getAllDocumentsList = () => {
  return new Promise((resolve, reject) => {
    AfterAuthApi(GET_ALL_DOCUMENTS_LIST, "post")
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};

export const attachDocument = (submitData) => {
  // console.log("submitData", submitData);
  return new Promise((resolve, reject) => {
    ApiCall(ATTACH_DOCUMENT, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};

export const approveVisitor = (submitData) => {
  // console.log("submitData", submitData);
  return new Promise((resolve, reject) => {
    ApiCall(APPROVE_VISITOR, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};
