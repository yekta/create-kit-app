import fs from "fs-extra";
import path from "path";

async function main() {
  let cwd = process.argv[2] || ".";
  if (fs.existsSync(cwd)) {
    console.log("Directory exists");
    process.exit(1);
  }
  let appDir = path.basename(path.resolve(cwd));
  fs.mkdirSync(appDir);
  fs.copySync("../template", appDir);
  console.log("folder", appDir);
  console.log("start");
}

async function start() {
  try {
    await main();
  } catch (error) {
    console.error(error);
  }
}

start();
