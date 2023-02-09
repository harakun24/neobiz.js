/** @format */

import { outFile, render } from "../index.js";

console.log(
  render({
    h1: { text: "Hello World!<b>this is text</b>" },
    ul: { html: "<li>Text hello</li>" },
  })
);

outFile("./select.html", {
  h1: { text: "Hello World! <b>this is \"text\"&'blue'</b>" },
  ul: { html: "<li>Text hello</li>" },
});
