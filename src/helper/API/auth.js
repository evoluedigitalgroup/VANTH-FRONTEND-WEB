import { AfterAuthApi, ApiCall } from "../index";
import {
	LOGIN_ADMIN,
	REGISTER_ADMIN,
	GENERATE_NEW_CODE,
	INVITE_NEW_ADMIN,
	GENERATE_DESIGNATION,
} from "../url";

export const loginAdmin = (submitData) => {
	// console.log("submitData", submitData);
	return new Promise((resolve, reject) => {
		ApiCall(LOGIN_ADMIN, "post", submitData)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject();
			});
	});
};

export const registerAdmin = (submitData) => {
	// console.log("submitData", submitData);
	return new Promise((resolve, reject) => {
		ApiCall(REGISTER_ADMIN, "post", submitData)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject();
			});
	});
};

export const getDesignation = (submitData) => {
	// console.log("submitData", submitData);
	return new Promise((resolve, reject) => {
		ApiCall(GENERATE_DESIGNATION, "post", submitData)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject();
			});
	});
};

export const generateCode = () => {
	return new Promise((resolve, reject) => {
		AfterAuthApi(GENERATE_NEW_CODE, "post")
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject();
			});
	});
};

export const inviteAdmin = (submitData) => {
	return new Promise((resolve, reject) => {
		AfterAuthApi(INVITE_NEW_ADMIN, "post", submitData)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject();
			});
	});
};
