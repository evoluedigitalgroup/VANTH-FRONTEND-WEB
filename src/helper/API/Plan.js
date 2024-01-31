import { AfterAuthApi } from "../index";
import {
	PLANS_LIST,
	PLAN_USAGE,
} from "../url";

export const plansListData = () => {
	return new Promise((resolve, reject) => {
		AfterAuthApi(PLANS_LIST, "post")
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject();
			});
	});
};

export const getPlanUsageData = () => {
	return new Promise((resolve, reject) => {
		AfterAuthApi(PLAN_USAGE, "post")
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject();
			});
	});
};