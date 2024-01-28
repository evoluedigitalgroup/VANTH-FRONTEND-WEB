// AUTH APIs
export const LOGIN_ADMIN = "auth/login";
export const REGISTER_ADMIN = "auth/sign-up";
export const CONTACT_FORM = "contact/submit-contact";
export const SUBMIT_DOCUMENT = "doc/submit-documents";
export const APPROVE_ADDRESS_PROOF = "doc/address-proof";
export const ATTACH_DOCUMENT = "doc/attachment-document";

export const GET_DOCUMENT_DETAIL = "get-document-details";

// AFTER AUTH URL
export const GENERATE_NEW_CODE = "invite/generate-random-code";
export const GENERATE_DESIGNATION = "invite/get-code";
export const INVITE_NEW_ADMIN = "invite/invite-new-admin";

export const ADD_NEW_DOCUMENT_TYPE = "document/add-new-document-type";

export const PERMISSION_TABLE = "permissions/filter-users-list";
export const CHANGE_PERMISSION = "permissions/change-permission";

export const GET_CONTACT = "contacts/filter-contacts";
export const APPROVE_VISITOR = "contacts/approve-visitor";

export const CHANGE_PASSWORD = "auth/change-password";

export const GET_PROFILE = "profile/get-profile";
export const EDIT_PROFILE = "profile/edit-profile";
export const GENERATE_LINK = "contacts/generate-document-request-link";
export const GENERATE_NEW_LINK = "contacts/get-document-file";
export const GET_ALL_DOCUMENTS_LIST = "contacts/get-document-file";
export const DOCUMENT_LIST = "document/get-all-document-details";

export const PROFILE_HISTORY = "profile/filter-history";
export const APPROVED_DOCUMENT = "document/approved-document";
export const CHART_DATA = "home/insights-with-filter";

export const GET_CONTRACTS = "contract/filter-contracts";
export const CREATE_TEMPLATE = 'contract/create-template';
export const GET_TEMPLATES = 'contract/get-templates';
export const GENERATE_CONTRACT_LINK = 'contract/create-contract';
export const GET_CONTRACT_DETAILS_LINK = 'contract/get-contract-details';
export const UPDATE_CONTRACT_STATUS_LINK = 'contract/update-contract-status';