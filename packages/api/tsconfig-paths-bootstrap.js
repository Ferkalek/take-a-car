const path = require("path");
const tsConfig = require(path.resolve(__dirname, "tsconfig.json"));
const tsConfigPaths = require("tsconfig-paths");

console.log("Environment:", process.env.MAIN_ENV || process.env.ENV || "prod");

tsConfig.compilerOptions.paths["@env/*"] = [
  `./src/env/${process.env.MAIN_ENV || process.env.ENV || "prod"}/*`,
];

tsConfigPaths.register({
  baseUrl: tsConfig.compilerOptions.baseUrl,
  paths: tsConfig.compilerOptions.paths,
});
