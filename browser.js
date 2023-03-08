/** @format */

"use strict";

const adp = {};

function render(val = {}) {
  let result = "";
  try {
    Object.entries(val).forEach((e) => {
      if (Array.isArray(e[1])) {
        e[1].forEach((g) => {
          result += render({ [e[0]]: g });
        });
      } else if (typeof e[1] == "object") {
        e[0] = e[0].replace(/\s/g, "");
        e[0] = e[1].tag || e[0];
        delete e[1].tag;
        result += `<${e[0]}`;
        const temp = [];
        let inn = "";
        Object.entries(e[1]).forEach((k) => {
          if (typeof k[1] == "string" && k[0] != "text" && k[0] != "html") {
            result += ` ${k[0]}='${k[1].toString()}'`;
          }
          if (typeof k[1] == "function" && k[0] != "text" && k[0] != "html") {
            result += ` ${k[0]}='${(k[1] + "")
              .replace(/.*{/, "")
              .split("")
              .reverse()
              .join("")
              .replace(/}/, "")
              .split("")
              .reverse()
              .join("")}'`;
          } else if (k[0] == "text")
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
              typeof k[1] != "function"
                ? k[1]
                : (k[1] + "")
                    .replace(/.*{/, "")
                    .split("")
                    .reverse()
                    .join("")
                    .replace(/}/, "")
                    .split("")
                    .reverse()
                    .join("")
            }`;
            // typeof k[1] == "string" ? inn : inn.substring(0, inn.length - 1);
          } else temp.push(k);
        });

        const stat = ![
          "input",
          "link",
          "br",
          "hr",
          "area",
          "base",
          "br",
          "col",
          "embed",
          "img",
          "meta",
          "param",
          "source",
          "track",
          "wbr",
        ].includes(e[0]);
        if (stat) {
          result += ">";
          result += inn;
          for (let i of temp) {
            result += render({ [i[0]]: i[1] });
          }
          result += `</${e[0]}>`;
        } else {
          if (!stat) result += "/>";
        }
      }
    });
    result = result.replace(/[\r\n\t]/gm, "");
    result = result.replace(/\s{2,}/gm, " ");
  } catch (e) {
    result = `<p>Error: ${e.message}</p>`;
  }
  return result;
}
function rdr(val = {}) {
  let result = "<!DOCTYPE html>";
  if (Array.isArray(val)) {
    val.forEach((value) => {
      result += render(value);
    });
  } else result = render(val);
  return result;
}
function range(length, start = 0) {
  return [...Array(length)].map(() => start++);
}
function fromStr(letter, prefix = 0) {
  if (letter == "") return {};

  letter = letter.replace(/[\r\n\t]/gm, "").replace(/>\s{2,}</gm, "><");
  const result = {};

  if (/<([a-zA-Z0-9]{1,}).*?>.*?(<\/\1>)$/.exec(letter)?.[1]) {
    result.tag = /<([a-zA-Z0-9]{1,}).*?>.*?(<\/\1>)$/.exec(letter)[1];

    result.tag = result.tag + Array(prefix).fill(" ").join("");

    result.head = /<([a-zA-Z0-9]{1,}).*?>/.exec(letter)[0];

    result.inner = letter
      .replace(result.head, "")
      .split("")
      .reverse()
      .join("")
      .replace(
        `</${result.tag.replace(Array(prefix).fill(" ").join(""), "")}>`
          .split("")
          .reverse()
          .join(""),
        ""
      )
      .split("")
      .reverse()
      .join("");
  } else {
    result.tag = /<([a-zA-Z0-9]{1,}).*?\/>/.exec(letter)[1];

    result.tag = result.tag + Array(prefix).fill(" ").join("");

    result.head = /<([a-zA-Z0-9]{1,}).*?>/.exec(letter)[0];
    result.inner = "";
  }
  result.props = result.head.match(/[a-zA-Z0-9]{1,}=(["']).*?\1/g);

  let temp = { [result.tag]: {} };
  if (result.props)
    result.attr = result.props.forEach((e) => {
      let y = e.replace(/.*=(['"])/, "");
      y = y.substring(0, y.length - 1);
      let w = e.substring(0, e.indexOf("="));
      temp[result.tag][w] = y;
    });

  let s = [];
  let ttexr = result.inner;
  while (
    /<([a-zA-Z0-9]{1,}).*?>.*?(<\/\1>)/.exec(ttexr) ||
    /<([a-zA-Z0-9]{1,}).*?\/>/.exec(ttexr)
  ) {
    let ss;
    if (/<([a-zA-Z0-9]{1,}).*?>.*?(<\/\1>)/.exec(ttexr)) {
      ss = /<([a-zA-Z0-9]{1,}).*?>.*?(<\/\1>)/.exec(ttexr)[0];
      const h = /<([a-zA-Z0-9]{1,}).*?>.*?(<\/\1>)$/.exec(ss)[1];
      const sss = ttexr.slice(ttexr.indexOf(ss));
      const f = {
        a: sss.replace("<" + h, "").indexOf(`</${h}>`),
        b: sss.replace("<" + h, "").indexOf(`<${h}`),
      };

      ss = f.a > f.b && f.b > -1 ? sss : ss;
    } else {
      ss = /<([a-zA-Z0-9]{1,}).*?\/>/.exec(ttexr)[0];
    }
    ttexr = ttexr.replace(ss, "");
    s.push(ss);
  }
  s.sort((a, b) => {
    const r = { a: result.inner.indexOf(a), b: result.inner.indexOf(b) };
    return r.a > r.b ? 1 : r.a < r.b ? -1 : 0;
  });
  result.status = s;
  result.puretext = ttexr ? ttexr : ttexr + " ";
  //   result.temp = temp;
  if (result.puretext != " ") temp[result.tag].text = result.puretext;
  if (result.status) {
    const ss = new Set();
    const current = {};
    s.forEach((e) => {
      const hh = /<[a-zA-Z0-9]{1,}\s?/.exec(e)[0].substring(1);
      if (ss.has(hh)) {
        current[hh] = current[hh] + 1;
      } else {
        current[hh] = 0;
        ss.add(hh);
      }
      temp = {
        [result.tag]: { ...temp[result.tag], ...fromStr(e, current[hh]) },
      };
    });
  }
  return temp;
}

Object.defineProperty({}.__proto__, "render", {
  get: function () {
    return "<!DOCTYPE html>" + rdr(this);
  },
});
Object.defineProperty({}.__proto__, "reg", {
  value: function (name) {
    const val = this;
    if (!adp[name]) adp[name] = val;
  },
});
Object.defineProperty({}.__proto__, "regm", {
  value: function (name) {
    const val = this;
    if (adp[name]) adp[name] = val;
  },
});
Object.defineProperty({}.__proto__, "unreg", {
  value: function (name) {
    delete adp[name];
  },
});
Object.defineProperty({}.__proto__, "load", {
  value: function (component) {
    return adp[component] || "not registered";
  },
});
Object.defineProperty({}.__proto__, "css", {
  get: function () {
    let y = "";
    Object.entries(this).forEach((item) => {
      y += `${item[0]}{`;
      Object.entries(item[1]).forEach((itm) => {
        y += `${itm[0].replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}${
          typeof itm[1] == "object" ? "" : ":"
        }${typeof itm[1] == "object" ? "{" + itm[1].cssText + "}" : itm[1]}${
          typeof itm[1] == "object" ? "" : ";"
        }`;
      });
      y += "}";
    });
    return { text: y };
  },
});
Object.defineProperty({}.__proto__, "cssText", {
  get: function () {
    let y = "";
    Object.entries(this).forEach((itm) => {
      y += `${itm[0].replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}:${
        itm[1]
      };`;
    });
    return y;
  },
});

Object.defineProperty({}.__proto__, "alter", {
  value: function (fn) {
    fn(this);
    return this;
  },
});

Object.defineProperty("".__proto__, "repulse", {
  get: function () {
    return fromStr(this);
  },
});

Object.defineProperty([].__proto__, "range", {
  value: function (range2, start = 0) {
    return range(range2, start);
  },
});
