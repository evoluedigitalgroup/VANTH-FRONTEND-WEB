import axios from "axios";
import { BASE_URL } from "../config/index";

export const ApiCall = (url, method, data = null, headers = {}) => {
	return new Promise((resolve, reject) => {
		axios({
			method,
			url: `${BASE_URL}${url}`,
			data,
			headers: {
				...headers,
			},
		})
			.then(resolve)
			.catch(reject);
	});
};
// const token = store.getState().loginUsers?.loginUser?.data?.data?.jwtTokens?.accessToken;
// console.log("token", token);

export const AfterAuthApi = (url, method, data = null, headers = {}) => {
	return new Promise((resolve, reject) => {
		const token = JSON.parse(localStorage.getItem("accessToken"));
		// console.log("token", token);
		axios({
			method,
			url: `${BASE_URL}${url}`,
			data,
			headers: {
				Authorization: "Bearer " + token,
				...headers,
			},
		})
			.then((res) => {
				resolve(res);
			})
			.catch(reject);
	});
};
