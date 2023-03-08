/** @format */

import "../index.js";

console.log(
  { li: [{ text: "one" }, { tag: "p", text: "two" }, { text: "three" }] }.render
);

console.log(
  {
    PersonList: ["Arthur", "Zoro"].map((person) => ({
      tag: "li",
      text: person,
    })),
  }.render
);
