import { AfterAuthApi, ApiCall } from "../../helper/index";
import {
  GET_ALL_DOCUMENTS_LIST,
  SEND_GENERATED_LINK
} from "../../helper/url";


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

export const sendClientSms = (submitData) => {
  return new Promise((resolve, reject) => {
    AfterAuthApi(SEND_GENERATED_LINK, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
