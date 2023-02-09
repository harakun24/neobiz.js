/** @format */

//use function, iife recommended :)

import { render } from "../index.js";

console.log(
  // Ignore this
  render(((user) => ({ h1: { text: `Hello, ${user}` } }))("Vins"))
  //<h1>Hello, Vins</h1>
);

// or just use this below

const greeting = (user) => ({ h1: `Hello, ${user}` });

console.log(render(greeting("Vins")));
