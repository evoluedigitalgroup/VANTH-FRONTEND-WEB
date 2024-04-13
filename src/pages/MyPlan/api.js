import { api } from "../../helper";
import {
	PLANS_LIST,
	PLAN_USAGE,
	REMOVE_PLAN_SUBSCRIBE,
} from "../../helper/url";

export const plansListData = () => {
	return new Promise((resolve, reject) => {
		api(PLANS_LIST, "post")
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
		api(PLAN_USAGE, "post")
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject();
			});
	});
};

export const removePlanSubscription = (submitData) => {
	return new Promise((resolve, reject) => {
		api(REMOVE_PLAN_SUBSCRIBE, "post", submitData)
			.then((res) => {
				resolve(res.data);
				console.log(res)
			})
			.catch((err) => {
				reject();
			});
	});
};