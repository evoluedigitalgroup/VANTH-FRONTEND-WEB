import { api } from "../index";
import { CHART_DATA } from "../url";

export const getChartData = (submitData) => {
	return new Promise((resolve, reject) => {
		api(CHART_DATA, "post", submitData)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject();
			});
	});
};
