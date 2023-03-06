/** @format */

//use object literal

import "../index.js";

console.log(
  {
    h1: { text: "Hello World!" },
  }.render
);

//output: <h1>Hello World!</h1>

// output static file
console.log(
  {
    h1: { text: "Hello World!" },
  }.outFile("./basic_syntax.html:")
);

// properties
const page = {
  h1: { class: "heading", id: "main", text: "Hello World!" },
}.render;
