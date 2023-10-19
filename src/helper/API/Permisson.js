import { AfterAuthApi, ApiCall } from "../index";
import { PERMISSION_TABLE, CHANGE_PERMISSION } from "../url";

export const permissonTable = (submitData) => {
	return new Promise((resolve, reject) => {
		AfterAuthApi(PERMISSION_TABLE, "post", submitData)
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
		AfterAuthApi(CHANGE_PERMISSION, "post", submitData)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject();
			});
	});
};
