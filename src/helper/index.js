import { useMemo } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
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

export const AfterAuthApi = (url, method, data = null, headers = {}) => {
	return new Promise((resolve, reject) => {
		const token = JSON.parse(localStorage.getItem("accessToken"));
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


export const useQuery = () => {
	const { search } = useLocation();

	return useMemo(() => new URLSearchParams(search), [search]);
}