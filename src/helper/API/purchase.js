import { AfterAuthApi } from "../index";
import {
    PLAN_SUBSCRIBE
} from "../url";

export const createPlanSubscription = (data) => {
    return new Promise((resolve, reject) => {
        AfterAuthApi(PLAN_SUBSCRIBE, "post", data)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject();
            });
    });
};