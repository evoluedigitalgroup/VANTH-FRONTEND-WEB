import { api } from "../../helper/index";
import {
	CHANGE_PASSWORD,
	GET_PROFILE,
	EDIT_PROFILE,
	PROFILE_HISTORY,
} from "../../helper/url";

export const passwordChange = (submitData) => {
	return new Promise((resolve, reject) => {
		api(CHANGE_PASSWORD, "post", submitData)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject();
			});
	});
};

export const profileData = (submitData = {}) => {
	return new Promise((resolve, reject) => {
		api(GET_PROFILE, "post", submitData)
			.then((res) => {
				console.log("PROFILE DATA", res.data);
				resolve(res.data);
			})
			.catch((err) => {
				reject();
			});
	});
};

export const editProfile = (submitData) => {
	return new Promise((resolve, reject) => {
		api(EDIT_PROFILE, "post", submitData)
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
		api(PROFILE_HISTORY, "post", submitData)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject();
			});
	});
};
