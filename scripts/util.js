const fs = require("fs");

const readConfig = (configFile) => {
  return fs.readFileSync(configFile, {
    encoding: "utf-8",
  });
};

const checkBuildExist = (folderPath) => {
  return fs.existsSync(folderPath);
};

const getEnvType = (configFile) => {
  const configFileData = readConfig(configFile);
  return configFileData.split('export const ENV_TYPE = "')[1].split('";')[0];
};

module.exports = {
  readConfig,
  checkBuildExist,
  getEnvType,
};
