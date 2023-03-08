/** @format */

import "../index.js";

reg.call({ name: "viewport" }, "viewport");

console.log(load("viewport"));

regm.call(
  load("viewport").alter((o) => {
    o.content = "width=device-width, initial-scale=1.0";
  }),
  "viewport"
);

console.log(load("viewport"));

unreg("viewport");

console.log(load("viewport"));
