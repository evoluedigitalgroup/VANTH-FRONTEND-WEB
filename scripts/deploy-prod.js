const { getEnvType, checkBuildExist } = require("./util");
const { syncWithS3 } = require("./common");

const env = "production";

const buildPath = process.cwd() + "/build";
const configFile = process.cwd() + "/src/config/index.js";

const s3BucketName = "app.vanthdocs.com.br";

const currentEnv = getEnvType(configFile);
console.log("currentEnv : ", currentEnv);

if (currentEnv === env) {
  if (checkBuildExist(buildPath)) {
    syncWithS3(s3BucketName, buildPath)
      .then(() => {
        console.log("APPLICATION DEPLOYED SUCCESSFULLY");
      })
      .catch((e) => {
        console.log(`Something Went Wrong : ${e.message}`);
      });
  } else {
    console.error("Build folder is not exist");
  }
} else {
  console.error(`Configured environment is ${currentEnv}, it must be ${env}`);
}
