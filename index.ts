#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import ora from "ora";
import chalk from "chalk";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const main = async () => {
  let cwd = process.argv[2] || ".";

  if (fs.existsSync(cwd)) {
    console.log(chalk.red.bold(`Directory already exists, can't proceed.`));
    process.exit(1);
  }

  const projectName = path.basename(path.resolve(cwd));
  const projectDir = path.resolve(process.cwd(), projectName);

  const __filename = fileURLToPath(import.meta.url);
  const distPath = path.dirname(__filename);
  const pkgRoot = path.join(distPath, "../");
  const templateDir = path.join(pkgRoot, "template");

  const spinnerCreate = ora(
    `Creating in: ${chalk.cyan.bold(projectDir)}...\n`
  ).start();
  fs.mkdirSync(projectName);
  fs.copySync(templateDir, projectName);
  const gitIgnoreOldDir = path.join(projectDir, "_gitignore");
  const gitIgnoreNewDir = path.join(projectDir, ".gitignore");
  fs.renameSync(gitIgnoreOldDir, gitIgnoreNewDir);
  spinnerCreate.succeed(`Created at ${chalk.green.bold(projectDir)}`);

  const spinnerDependencies = ora(`Installing dependencies...\n`).start();
  await execAsync(`npm install`, { cwd: projectDir });
  spinnerDependencies.succeed(`Installed dependencies`);

  const spinnerGit = ora(`Initializing git...\n`).start();
  await execAsync(`git init`, { cwd: projectDir });
  spinnerGit.succeed(`Initialized git`);

  console.log(`${chalk.green.bold("Done!")}\n`);
  process.exit(0);
};

main().catch((err) => {
  console.log(err);
});
