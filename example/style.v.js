/** @format */

import "../index.js";

// inline
console.log(
  {
    h1: {
      text: "this is text",
      style: { color: "blue", fontSize: "140%" }.cssText,
    },
  }.render
);

// tag style
console.log(
  {
    style: {
      h1: {
        // something
      },
      body: {
        margin: "0px",
        padding: "0px",
      },
    }.css,
  }.render
);
