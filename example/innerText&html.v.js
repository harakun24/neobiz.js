/** @format */

import "../index.js";

console.log(
  {
    h1: { text: "Hello World!<b>this is text</b>" },
    ul: { html: "<li>Text hello</li>" },
  }.render
);

({
  h1: { text: "Hello World! <b>this is \"text\"&'blue'</b>" },
  ul: { html: "<li>Text hello</li>" },
}.outFile("./select.html"));
