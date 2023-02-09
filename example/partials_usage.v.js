/** @format */

import { render, partial } from "../index.js";

console.log(
  render({
    head: (await partial("./exported.v.js"))("example page"),
    h1: { text: "This is example" },
  })
  //<head><title>example page</title></head><h1>This is example</h1>
);
