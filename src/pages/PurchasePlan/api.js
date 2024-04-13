import { api } from "../../helper";
import {
    PLAN_SUBSCRIBE
} from "../../helper/url";

export const createPlanSubscription = (data) => {
    return new Promise((resolve, reject) => {
        api(PLAN_SUBSCRIBE, "post", data)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject();
            });
    });
};