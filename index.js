import Module from "./module.js";
import process from "node:process";
import { readFileSync } from "node:fs";
import path from 'node:path'

const currentDirectory = process.cwd();

const packageJsonPath = path.join(currentDirectory, "package.json");

const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

const entryFile = packageJson.main;

if(packageJson.type !== "module") {
  throw new Error("Only ESM is supported");
}

const entryModule = new Module(entryFile);

console.log(entryModule);
