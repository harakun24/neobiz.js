/** @format */

import { outFile } from "../index.js";

outFile("./temp.html", {
  button: { onclick: "sayHi(this)", id: "example" },
  script: {
    html: function () {
      document.getElementById("example").innerText = "click me!";

      function sayHi(el) {
        el.innerText = "hi!";
      }
    },
  },
});
