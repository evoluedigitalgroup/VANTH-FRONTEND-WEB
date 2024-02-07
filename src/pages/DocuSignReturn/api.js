import { AfterAuthApi, ApiCall } from "../../helper";
import {
  UPDATE_CONTRACT_STATUS_LINK
} from "../../helper/url";

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


