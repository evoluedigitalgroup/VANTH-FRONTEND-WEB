import { AfterAuthApi, ApiCall } from "../index";
import {
  CREATE_CONTRACT
} from "../url";

export const createContract = (submitData) => {
  return new Promise((resolve, reject) => {
    AfterAuthApi(CREATE_CONTRACT, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};
