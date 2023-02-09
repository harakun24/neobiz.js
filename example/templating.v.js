/** @format */

import { render } from "../index.js";

const template = (content) => ({
  div: {
    class: "main wrapper",
    div: content,
  },
});

console.log(
  render(
    template({
      h1: { text: "Hello World!" },
    })
  )
);

//<div class='main wrapper'><div><h1>Hello World!</h1></div></div>
