const { getEnvType } = require("./util");
const { createBuild } = require("./common");

const env = "production";

const folderName = process.cwd() + "/build";
const configFile = process.cwd() + "/src/config/index.js";

const currentEnv = getEnvType(configFile);
console.log("currentEnv : ", currentEnv);

if (currentEnv === env) {
  createBuild(env, folderName)
    .then(() => {
      console.log("BUILD CREATED SUCCESSFULLY");
    })
    .catch((e) => {
      console.log(`Something Went Wrong : ${e.message}`);
    });
} else {
  console.error(`Configured environment is ${currentEnv}, it must be ${env}`);
}
