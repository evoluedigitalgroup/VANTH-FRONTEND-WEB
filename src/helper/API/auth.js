import { AfterAuthApi, ApiCall } from "../index";
import {
	LOGIN_ADMIN,
	REGISTER_ADMIN,
	GENERATE_NEW_CODE,
	GENERATE_DESIGNATION,
	INVITE_NEW_USER,
	INCREMENT_COUNTER,
	EMAIL_CONFIRMATION,
} from "../url";

export const loginAdmin = (submitData) => {
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

export const emailConfirmation = (submitData) => {
	return new Promise((resolve, reject) => {
		ApiCall(EMAIL_CONFIRMATION, "post", submitData)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject();
			});
	});
};

export const registerAdmin = (submitData) => {
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

export const incrementCounter = (submitData) => {
	return new Promise((resolve, reject) => {
		ApiCall(INCREMENT_COUNTER, "post", submitData)
			.then((res) => {
				resolve(res.data);
			}).catch((err) => {
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

export const inviteUser = (submitData) => {
	return new Promise((resolve, reject) => {
		AfterAuthApi(INVITE_NEW_USER, "post", submitData)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject();
			});
	});
};
