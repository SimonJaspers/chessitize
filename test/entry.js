const directory = require.context("./");
directory
  .keys()
  .filter(k => k.includes(".test.js"))
  .forEach(directory);
