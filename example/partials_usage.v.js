/** @format */

import "../index.js";
import head from "./exported.v.js";
console.log(
  render({
    head: head("example page"),
    h1: { text: "This is example" },
  })
  //<head><title>example page</title></head><h1>This is example</h1>
);
