/** @format */

function fromStr(letter, prefix = 0) {
  if (letter == "") return;
  letter = letter.replace(/[\r\n\t]/gm, "").replace(/>\s{2,}</gm, "><");
  const result = {};

  result.tag = /<([a-zA-Z0-9]{1,}).*?>.*?(<\/\1>)$/.exec(letter)[1];

  result.tag = result.tag + Array(prefix).fill(" ").join("");

  result.head = /<([a-zA-Z0-9]{1,}).*?>/.exec(letter)[0];

  result.props = result.head.match(/[a-zA-Z0-9]{1,}=(["']).*?\1/g);

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

  while (/<([a-zA-Z0-9]{1,}).*?>.*?(<\/\1>)/.exec(ttexr)) {
    let ss = /<([a-zA-Z0-9]{1,}).*?>.*?(<\/\1>)/.exec(ttexr)[0];
    const h = /<([a-zA-Z0-9]{1,}).*?>.*?(<\/\1>)$/.exec(ss)[1];
    const sss = ttexr.slice(ttexr.indexOf(ss));
    const f = {
      a: sss.replace("<" + h, "").indexOf(`</${h}>`),
      b: sss.replace("<" + h, "").indexOf(`<${h}`),
    };

    ss = f.a > f.b ? sss : ss;
    ttexr = ttexr.replace(ss, "");
    s.push(ss);
  }
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
module.exports = fromStr;
