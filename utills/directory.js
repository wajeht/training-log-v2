const path = require("path");
const rootDirectory = path.dirname(__dirname);
const currentDirectory = path.dirname(require.main.filename);

module.exports = {
  root: rootDirectory,
  current: currentDirectory,
};
