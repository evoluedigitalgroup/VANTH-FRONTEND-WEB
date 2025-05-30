import { api } from "../../helper/index";
import { PAGE_LIMIT } from "../../config";
import {
  GET_CONTACT,
  GENERATE_LINK,
  CONTACT_FORM,
  GENERATE_NEW_LINK,
  ATTACH_DOCUMENT,
  APPROVE_VISITOR,
  GET_ALL_DOCUMENTS_LIST,
  ADD_NEW_DOCUMENT_TYPE,
  GET_ALL_DOCUMENTS_LIST_PUBLIC,
  PUBLIC_UPDATE_CONTACT,
  REMOVE_DOCUMENT_TYPE,
} from "../../helper/url";

export const getContactList = (page = 1, search = "", status = "", limit = PAGE_LIMIT) => {
  return new Promise((resolve, reject) => {
    const submitData = {
      start: (page - 1) * limit,
      limit,
      search,
      status,
    };
    api(GET_CONTACT, "post", submitData)
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
    api(GENERATE_LINK, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};

export const contactForm = (submitData) => {
  return new Promise((resolve, reject) => {
    api(CONTACT_FORM, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};

export const addNewDocumentType = (submitData) => {
  return new Promise((resolve, reject) => {
    api(ADD_NEW_DOCUMENT_TYPE, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  })
};

export const removeDocumentType = (submitData) => {
  return new Promise((resolve, reject) => {
    api(REMOVE_DOCUMENT_TYPE, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  })
};

export const generateNewLink = (submitData) => {
  return new Promise((resolve, reject) => {
    api(GENERATE_NEW_LINK, "post", submitData)
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
    api(GET_ALL_DOCUMENTS_LIST, "post")
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};

export const getAllDocumentsPublicList = (submitData) => {
  return new Promise((resolve, reject) => {
    api(GET_ALL_DOCUMENTS_LIST_PUBLIC, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};

export const attachDocument = (submitData) => {
  return new Promise((resolve, reject) => {
    api(ATTACH_DOCUMENT, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};


export const updateClientContact = (submitData) => {
  return new Promise((resolve, reject) => {
    api(PUBLIC_UPDATE_CONTACT, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};

export const approveVisitor = (submitData) => {
  return new Promise((resolve, reject) => {
    api(APPROVE_VISITOR, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};
