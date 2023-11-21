const config = {
  TIMEZONE: "America/Sao_Paulo",
};

const envData = (ENV, local, test, production) => {
  if (ENV === "local") {
    return local;
  } else if (ENV === "test") {
    return test;
  } else if (ENV === "production") {
    return production;
  } else {
    console.log(new Error("Something went wrong with credentials"));
  }
};

export const ENV_TYPE = "local"; // local // test // production

export const BASE_URL = envData(
  ENV_TYPE,
  "http://192.168.166.99:3007/api/v1/",
  "http://34.198.94.219:3000/api/v1/",
  "http://34.198.94.219:3000/api/v1/"
);
export const LINK_URL = envData(
  ENV_TYPE,
  "http://localhost:3001/document-verification/",
  "https://www.tbaconsulting.com.br/document-verification/",
  "https://www.tbaconsulting.com.br/document-verification/"
);

// export const LINK_URL = "localhost:3003/document-verification/";

export default config;
