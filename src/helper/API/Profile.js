import { AfterAuthApi, ApiCall } from "../index";
import {
	CHANGE_PASSWORD,
	GET_PROFILE,
	EDIT_PROFILE,
	PROFILE_HISTORY,
} from "../url";

export const passwordChange = (submitData) => {
	// console.log("su", submitData);
	return new Promise((resolve, reject) => {
		AfterAuthApi(CHANGE_PASSWORD, "post", submitData)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject();
			});
	});
};

export const profileData = (submitData) => {
	// console.log("su", submitData);
	return new Promise((resolve, reject) => {
		AfterAuthApi(GET_PROFILE, "post", submitData)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject();
			});
	});
};

export const editProfile = (submitData) => {
	// console.log("su", submitData);
	return new Promise((resolve, reject) => {
		AfterAuthApi(EDIT_PROFILE, "post", submitData)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject();
			});
	});
};

export const profileHistory = (submitData) => {
	return new Promise((resolve, reject) => {
		AfterAuthApi(PROFILE_HISTORY, "post", submitData)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject();
			});
	});
};
