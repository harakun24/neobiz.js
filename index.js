/** @format */
"use strict";
const path = require("path");
function render(val = {}) {
  let result = "";
  Object.entries(val).forEach((e) => {
    if (e[1].length) {
      e[1].forEach((g) => {
        result += render({ [e[0]]: g });
      });
    } else if (typeof e[1] == "object") {
      e[0] = e[0].replace(/\s/g, "");
      result += `<${e[0]}`;
      const temp = [];
      let inn = "";
      Object.entries(e[1]).forEach((k) => {
        if (typeof k[1] == "string" && k[0] != "text" && k[0] != "html")
          result += ` ${k[0]}='${k[1]}'`;
        else if (k[0] == "text")
          inn = `${
            typeof k[1] == "string"
              ? k[1]
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/"/g, "&quot;")
                  .replace(/'/g, "&#39;")
              : k[1].toString()
          }`;
        else if (k[0] == "html") {
          inn = `${
            typeof k[1] != "function" ? k[1] : (k[1] + "").replace(/.*{/, "")
          }`;
          inn =
            typeof k[1] == "string" ? inn : inn.substring(0, inn.length - 1);
        } else temp.push(k);
      });
      const stat = !["input", "link", "br", "hr"].includes(e[0]);
      if (stat) result += ">";
      result += inn;
      for (let i of temp) result += render({ [i[0]]: i[1] });
      if (stat) result += `</${e[0]}>`;
      else result += "/>";
    } else {
    }
  });
  result = result.replace(/[\r\n\t]/gm, "");
  result = result.replace(/\s{2,}/gm, " ");
  return result;
}
function range(length, start = 0) {
  return [...Array(length)].map(() => start++);
}

function outFile(source, data) {
  const fs = require("fs");
  (function () {
    const dir = path.dirname(path.resolve(source));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    fs.writeFileSync(source, render(data));
    console.log(`Output file: ${source}`);
  })();
}

module.exports = {
  render,
  range,
  outFile,
  fromStr: require("./str.h.js"),
  partial: async (src) => {
    const { default: i } = await import(
      path.join("file:\\\\", process.cwd(), src)
    );
    return i;
  },
};
