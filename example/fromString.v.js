/** @format */

import { outFile, fromStr } from "../index.js";

const temp = `
<div id="first">
  <ul id="outer">
    <li>1</li>
    <li>2</li>
  </ul>
  <div id="inner-div">
    <ul id="inner-ul">
      <li>3</li>
      <li>4</li>
    </ul>
  </div>
</div>
`;

const { div } = fromStr(temp);

div.ul.li.text = "data-1";
div.div.ul.class = "inner";

outFile("./temp.html", { div });

console.dir({ div }, { depth: null });
