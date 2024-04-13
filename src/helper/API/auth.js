import { api } from "../index";
import {
  LOGIN_ADMIN,
  REGISTER_ADMIN,
  GENERATE_NEW_CODE,
  GENERATE_DESIGNATION,
  INVITE_NEW_USER,
  INCREMENT_COUNTER,
  EMAIL_CONFIRMATION,
  RESET_PASSWORD,
  FORGOT_PASSWORD,
} from "../url";

export const loginAdmin = (submitData) => {
  return new Promise((resolve, reject) => {
    api(LOGIN_ADMIN, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};

export const emailConfirmation = (submitData) => {
  return new Promise((resolve, reject) => {
    api(EMAIL_CONFIRMATION, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};

export const resetPassword = (submitData) => {
  return new Promise((resolve, reject) => {
    api(RESET_PASSWORD, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};

export const forgotPassword = (submitData) => {
  return new Promise((resolve, reject) => {
    api(FORGOT_PASSWORD, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};

export const registerAdmin = (submitData) => {
  return new Promise((resolve, reject) => {
    api(REGISTER_ADMIN, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};

export const getDesignation = (submitData) => {
  return new Promise((resolve, reject) => {
    api(GENERATE_DESIGNATION, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};

export const incrementCounter = (submitData) => {
  return new Promise((resolve, reject) => {
    api(INCREMENT_COUNTER, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};

export const generateCode = () => {
  return new Promise((resolve, reject) => {
    api(GENERATE_NEW_CODE, "post")
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};

export const inviteUser = (submitData) => {
  return new Promise((resolve, reject) => {
    api(INVITE_NEW_USER, "post", submitData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject();
      });
  });
};
