/** @format */
require("./browser");
const path = require("path");

function outFile(source, data) {
  const fs = require("fs");
  (function () {
    const dir = path.dirname(path.resolve(source));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    fs.writeFileSync(source, data.render);
    console.log(`Output file: ${source}`);
  })();
}

Object.defineProperty({}.__proto__, "outFile", {
  value: function (goes) {
    return outFile(goes, this);
  },
});
