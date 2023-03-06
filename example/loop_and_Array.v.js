/** @format */

import "../index.js";

// use range @param= length, startFrom

console.log(
  {
    ul: {
      li: [].range(8, 1).map((item) => ({ text: "data-" + item })),
    },
  }.render
  //<ul><li>data-1</li><li>data-2</li><li>data-3</li><li>data-4</li><li>data-5</li><li>data-6</li><li>data-7</li><li>data-8</li></ul>
);

// map
console.log(
  {
    ul: {
      li: ["grape", "banana", "apple"].map((text) => ({ text })),
    },
  }.render
  //<ul><li>grape</li><li>banana</li><li>apple</li></ul>
);

// for
console.log(
  {
    ul: {
      li: (() => {
        const result = [];
        for (let i = 1; i < 9; i++) result.push({ text: "data-" + i });
        return result;
      })(),
    },
  }.render
  //<ul><li>data-1</li><li>data-2</li><li>data-3</li><li>data-4</li><li>data-5</li><li>data-6</li><li>data-7</li><li>data-8</li></ul>
);

// while
console.log(
  {
    ul: {
      li: (() => {
        const result = [];
        let i = 0;
        while (++i < 9) result.push({ text: "data-" + i });
        return result;
      })(),
    },
  }.render
  //<ul><li>data-1</li><li>data-2</li><li>data-3</li><li>data-4</li><li>data-5</li><li>data-6</li><li>data-7</li><li>data-8</li></ul>
);
