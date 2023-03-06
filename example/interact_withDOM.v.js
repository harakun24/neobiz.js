/** @format */

import "../index.js";

({
  button: {
    text: "click me",
    onclick() {
      this.innerText = "hi!";
    },
    id: "example",
  },
  script: {
    html() {
      document.getElementById("example").innerText = "click me!";
    },
  },
}.outFile("./temp.html"));
