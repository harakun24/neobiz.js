/** @format */

//use object literal

import { render, outFile } from "../index.js";

console.log(
  render({
    h1: { text: "Hello World!" },
  })
);

//output: <h1>Hello World!</h1>

// output static file
outFile("./basic.html", {
  h1: { text: "Hello World!" },
});

// properties
render({
  h1: { class: "heading", id: "main", text: "Hello World!" },
});
