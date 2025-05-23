import { api } from "../../helper";
import { PERMISSION_TABLE, CHANGE_PERMISSION } from "../../helper/url";

export const permissionTableApi = (submitData) => {
    return new Promise((resolve, reject) => {
        api(PERMISSION_TABLE, "post", submitData)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject();
            });
    });
};

export const changePermission = (submitData) => {
    return new Promise((resolve, reject) => {
        api(CHANGE_PERMISSION, "post", submitData)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject();
            });
    });
};
