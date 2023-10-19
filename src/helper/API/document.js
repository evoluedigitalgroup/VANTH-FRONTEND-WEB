import { AfterAuthApi, ApiCall } from "../index";
import {
	DOCUMENT_LIST,
	APPROVED_DOCUMENT,
	SUBMIT_DOCUMENT,
	APPROVE_ADDRESS_PROOF,
} from "../url";

export const getDocumentList = (submitData) => {
	return new Promise((resolve, reject) => {
		AfterAuthApi(DOCUMENT_LIST, "post", submitData)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject();
			});
	});
};

export const approvedDocumentList = (submitData) => {
	return new Promise((resolve, reject) => {
		AfterAuthApi(APPROVED_DOCUMENT, "post", submitData)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject();
			});
	});
};

export const submitDocument = (submitData) => {
	// console.log("submitData", submitData);
	return new Promise((resolve, reject) => {
		ApiCall(SUBMIT_DOCUMENT, "post", submitData)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject();
			});
	});
};

export const submitAddressDocument = (submitData) => {
	// console.log("submitData", submitData);
	return new Promise((resolve, reject) => {
		ApiCall(APPROVE_ADDRESS_PROOF, "post", submitData)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject();
			});
	});
};
