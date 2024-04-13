import { useMemo } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../config/index";

const axiosIntance = axios.create({
	baseURL: BASE_URL,
});

axiosIntance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("accessToken")
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosIntance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response && error.response.status === 403) {
			if (error.response.data.tokenExpired) {
				const refreshToken = localStorage.getItem("refreshToken")

				if (!refreshToken) {
					localStorage.clear();
					window.location.href = "/login";
				}

				const newAxiosIntance = axios.create({
					baseURL: BASE_URL,
				});

				try {
					const response = await newAxiosIntance
						.post("/auth/refresh-token", {
							refreshToken,
						})

					if (!response.data.success) {
						localStorage.clear();
						window.location.href = "/login";
					}

					localStorage.setItem("accessToken", response.data.accessToken)

					originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

					return newAxiosIntance(originalRequest);
				} catch (error) {
					localStorage.clear();
					window.location.href = "/login";
				}
			} else {
				localStorage.clear();
				window.location.href = "/login";
			}
		}
		return Promise.reject(error);
	}
);

export function api(url, method, data = null, headers = {}) {
	return new Promise((resolve, reject) => {
		axiosIntance({
			method,
			url,
			data,
			headers,
		})
			.then((response) => {
				console.log("RESPONSE", response);
				resolve(response);
			})
			.catch((error) => {
				console.log("ERROR", error);
				reject(error);
			});
	});
}

export const useQuery = () => {
	const { search } = useLocation();

	return useMemo(() => new URLSearchParams(search), [search]);
}