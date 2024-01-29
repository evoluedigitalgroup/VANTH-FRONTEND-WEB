import { AfterAuthApi } from "../index";
import {
	PLANS_LIST
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