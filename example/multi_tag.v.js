/** @format */

import { render } from "../index.js";

console.log(
  render({
    ul: {
      li: [{ text: "one" }, { text: "two" }, { text: "3" }],
    },
  })
);

// <ul><li>one</li><li>two</li><li>3</li></ul>
