/** @format */

import { render } from "../index.js";

const status = false;

// ternary operator

console.log(
  render({
    h1: status
      ? { text: "Hello World!" }
      : {
          a: { href: "#", text: "You are offline!" },
        },
  })
  //<h1><a href='#'>You are offline!</a></h1
);

// use IIFE

// IF
console.log(
  render({
    h1: (() => {
      let result;
      if (status) result = { text: "Hello World!" };
      else
        result = {
          a: { href: "#", text: "You are offline!" },
        };
      return result;
    })(),
  })
  //<h1><a href='#'>You are offline!</a></h1
);

// SWITCH
console.log(
  render({
    h1: (() => {
      let result;
      switch (status) {
        case true:
          result = { text: "Hello World!" };
          break;
        case false:
          result = {
            a: { href: "#", text: "You are offline!" },
          };
      }
      return result;
    })(),
  })
  //<h1><a href='#'>You are offline!</a></h1
);
