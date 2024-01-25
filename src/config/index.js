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
  "http://localhost:3017/api/v1/",
  "https://api.vanthdocs.com.br/api/v1/",
  "https://api.vanthdocs.com.br/api/v1/"
);
export const LINK_URL = envData(
  ENV_TYPE,
  "http://localhost:3000/document-verification/",
  "https://system.vanthdocs.com.br/document-verification/",
  "https://system.vanthdocs.com.br/document-verification/"
);
export const PAGE_LIMIT = 10;

// export const LINK_URL = "localhost:3003/document-verification/";

export default config;
