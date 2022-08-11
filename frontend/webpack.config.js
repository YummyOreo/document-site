const path = require("path");

module.exports = {
  mode: "development", // production
  entry: {
    main: "./src/ts/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
};
