import { AfterAuthApi, ApiCall } from "../../helper/index";
import {
  GET_ALL_DOCUMENTS_LIST,
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
