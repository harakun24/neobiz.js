/** @format */

import "../index.js";

const template = (content) => ({
  div: {
    class: "main wrapper",
    div: content,
  },
});

console.log(
  template({
    h1: { text: "Hello World!" },
  }).render
);

//<div class='main wrapper'><div><h1>Hello World!</h1></div></div>
