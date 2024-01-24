import { AfterAuthApi, ApiCall } from "../index";
import {
  CREATE_TEMPLATE,
  GET_TEMPLATES
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