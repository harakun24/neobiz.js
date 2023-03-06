/** @format */

//use function, iife recommended :)

import "../index.js";

console.log(
  // Ignore this
  ((user) => ({ h1: { text: `Hello, ${user}` } }))("Vins").render
  //<h1>Hello, Vins</h1>
);

// or just use this below

const greeting = (user) => ({ h1: `Hello, ${user}` });

console.log(greeting("Vins").render);
