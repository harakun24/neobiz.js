<!-- @format -->

# Documentation Neobiz.js

> A simple view engine that has 100% JS features

Neobiz.js is pure JS lang, transpile Object to HTML as string

`read /example dir to understanding`

[this link to usage in express.js](https://www.npmjs.com/package/neobiz-express?activeTab=dependencies)

**Features**

| function | params                             | return-type | description                     |
| -------- | ---------------------------------- | ----------- | ------------------------------- |
| render   | content:object                     | string      | rendering to HTML               |
| outFile  | destination:string, content:object |             | generate static HTML file       |
| range    | length:int, start:int              | Array       | shortcut for looping in a range |
| partial  | source:string                      | AsyncFn     | including other file            |

## Basic syntax

It's just Object in js!

```js
{
  // text property is same as innerHTML
  h1: {
    text: "Hello World!";
  }
}
// <h1>Hello World!</h1>
```

properties dom

```js
{
  // text property is same as innerHTML
  h1: {
    class:"heading",
    text: "Hello World!";
    style:"color: #DC1E1E"
  }
}
// <h1 class="heading" style="color: #DC1E1E">Hello World!</h1>
```

nested dom:

```js
{
  body: {
    h1: {
      text: "Hello World!";
    }
  }
}
```

siblings dom:

There is a case like this:

```html
<li>orange</li>
<li>banana</li>
```

Object can not use 2 keys with same name, instead use this:

```js
// Don't do this
{
  li:{text:"orange"},
  li:{text:"banana"},
}

// Do this
{
  li:[
    {text:"orange"},
    {text:"banana"},
  ]
}
```

What if there is somethings in the middle of list?

```html
<li>orange</li>
<p>
  <span>This is in the middle</span>
</p>
<li>banana</li>
```

Can't use array? just use this:

```js
{
  li:{text:"orange"},
  p:{span:{text:"This is in the middle"}}
  li:{text:"banana"},
}
```

## Pass Value

use function

```js
import { render } from "../index.js";

console.log(render(((user) => ({ h1: { text: `Hello, ${user}` } }))("Vins")));
```

or

```js
const greeting = (user) => ({ h1: `Hello, ${user}` });

console.log(render(greeting("Vins")));
```

## Control Flow

ternary:

```js
{
    h1: status
      ? { text: "Hello World!" }
      : {
          a: { href: "#", text: "You are offline!" },
        },
}
```

IIFE if-else

```js
{
    h1: (() => {
      let result;
      if (status) result = { text: "Hello World!" };
      else
        result = {
          a: { href: "#", text: "You are offline!" },
        };
      return result;
    })(),
}
```

IIFE switch-case

```js
{
    h1: (() => {
      let result;
      switch (status) {
        case true:
          result = { text: "Hello World!" };
          break;
        case false:
          result = {
            a: { href: "#", text: "You are offline!" },
          };
      }
      return result;
    })(),
}
```

## Loop & array manipulation

range & map:

```js
import { render, range } from "../index.js";

  {
    ul: {
      li: range(8, 1).map((item) => ({ text: "data-" + item })),
    },
  }
```

map

```js
  {
    ul: {
      li: ["grape", "banana", "apple"].map((text) => ({ text })),
    },
  }
```

for

```js
  {
    ul: {
      li: (() => {
        const result = [];
        for (let i = 1; i < 9; i++) result.push({ text: "data-" + i });
        return result;
      })(),
    },
  }
```

while

```js
  {
    ul: {
      li: (() => {
        const result = [];
        let i = 0;
        while (++i < 9) result.push({ text: "data-" + i });
        return result;
      })(),
    },
  }
```

## partial & templating

### partial

make sure to export as function & default

```js
import { render, partial } from "../index.js";

  {
    head: (await partial("./exported.v.js"))("example page"),
    h1: { text: "This is example" },
  }
```

`/exported.v.js`

```js
export default (title) => ({ title: { text: title } });
```

### templating

this example use single file usage. for modular usage leave to you

```js
import { render } from "../index.js";

const template = (content) => ({
  div: {
    class: "main wrapper",
    div: content,
  },
});

template({
  h1: { text: "Hello World!" },
});
```
