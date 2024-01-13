const fs = require("fs");
const { spawn } = require("child_process");

const createBuild = (env, folderName) => {
  return new Promise((resolve, reject) => {
    let response = null;
    if (fs.existsSync(folderName)) {
      fs.rmdirSync(folderName, { recursive: true });
    }
    console.log(`STARTING DEPLOYMENT OF ${env.toUpperCase()} BUILD`);

    const build = spawn("npm run build", {
      shell: true,
    });

    build.stdout.setEncoding("utf8");
    build.stdout.on("data", (data) => {
      console.log(`${data.toString()}`);
    });
    build.stderr.on("data", (data) => {
      console.log(`${data.toString()}`);
    });
    build.on("error", (error) => {
      console.log(`error: ${error.message}`);
      response = 1;
      reject();
    });

    build.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
      if (!response) {
        resolve();
      }
    });
  });
};

const syncWithS3 = (s3BucketName, buildPath) => {
  let response = null;
  return new Promise((resolve, reject) => {
    const deploy = spawn(`aws --profile vanth-docs-system s3 sync . s3://${s3BucketName}/`, {
      shell: true,
      cwd: buildPath,
    });

    deploy.stdout.on("data", (data) => {
      console.log(`${data}`);
    });

    deploy.stderr.on("data", (data) => {
      console.log(`${data}`);
    });

    deploy.on("error", (error) => {
      console.log(`error: ${error.message}`);
      response = 1;
      reject();
    });

    deploy.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
      if (!response) {
        resolve();
      }
    });
  });
};

module.exports = {
  createBuild,
  syncWithS3,
};
