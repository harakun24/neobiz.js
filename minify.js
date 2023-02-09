/** @format */
const fs = require("fs");

fs.writeFileSync(
  "./neobiz.min.js",
  fs
    .readFileSync("./index.js")
    .toString()
    .replace(/[\r\n\t]/gm, "")
    .replace(/\s{2,}/gm, " ")
);
