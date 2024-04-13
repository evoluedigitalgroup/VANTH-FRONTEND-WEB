import { api } from "../../helper";
import {
  GET_CONTRACT_DETAILS_LINK,
} from "../../helper/url";



export const getPublicContractDetails = (submitData) => {
  return new Promise((resolve, reject) => {
    api(GET_CONTRACT_DETAILS_LINK, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};
