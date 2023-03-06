<!-- @format -->

# Documentation Neobiz.js 3.3

> A simple view engine that has 100% JS features

Neobiz.js is pure in JS lang, transform Object into HTML

`read /example dir to understanding`

[link to usage in express.js](https://www.npmjs.com/package/neobiz-express?activeTab=dependencies)

---

## Example with `vue` in browser

page.js

```js
import "neobiz";

({
  div: {
    script: [
      { src: "https://unpkg.com/vue@3/dist/vue.global.js" },
      { src: "https://unpkg.com/neobiz@3.1.0/browser.js" },
      { src: "./my-component.js" },
    ],
    id: "app",
  },
  script: {
    html: () => {
      const { createApp } = Vue;

      createApp(myComponent).mount("#app");
    },
  },
}.outFile("./welcome.html"));
```

my-component.js

```js
const myComponent = {
  data() {
    return { msg: "hi, this is example" };
  },
  template: { h1: { text: "{{msg}}" } }.render,
};
```

<br>

| properties | caller                                | return-type | description                      |
| ---------- | ------------------------------------- | ----------- | -------------------------------- |
| render     | Object                                | string      | rendering to HTML                |
| outFile    | Object @params[destination]           | void        | generate static HTML file        |
| range      | Array @params length[int], start[int] | Array       | shortcut for looping in a range  |
| repulse    | String                                | Object      | generate object from HTML string |
| css        | Object                                | Object      | generate css from object         |
| cssText    | Object                                | String      | inline css                       |

#### Why use this?

- Integrating back-end to view
- **directly** manipulation data or Model with a view
- Generate static html file
- Full control of view. Such as filtering, encrypting the data before serve, or just like conditional and loop case
- Almost no need to learn anything. Just need to learn how to render
- Limitless potential, because it's just js. Almost all library should be compatible

## Basic syntax

How to use? just import this:

```js
import "neobiz";
```

It's just an Object! `wrap in () to create a statement or just assign to a var`

```js
{
  // text property is same as innerText
  h1: {
    text: "Hello World!",
  },
}.render;
// <h1>Hello World!</h1>
```

Comments:

```js
{
  // this is comment
  /*
  this is multi line
  */
  h1: {
    text: "This is heading";
  }
}
```

properties dom

```js
{
  h1: {
    class:"heading",
    text: "Hello World!",
    style:"color: #DC1E1E",
  }
}
// <h1 class="heading" style="color: #DC1E1E">Hello World!</h1>
```

innerText & innerHTML:

```js
  {
    h1: { text: "<b>this is a text</b>" },
    ul: { html: "<li>this will be render as html</li>" },
  }
```

nested dom:

```js
{
  body: {
    h1: {
      text: "Hello World!",
    }
  }
}
```

expression & operator

```js
{
  span: [
    { text: 24 + 12 / 6 },
    { text: !false },
  ],
}
```

siblings dom:

There is a case like this:

```html
<li>orange</li>
<li>banana</li>
```

Object can not use 2 keys with the same name

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

> use string as key could distinc an element with just a space
> no need to worry, it will render without space

```js
{
  li:{text:"orange"},
  p:{span:{text:"This is in the middle"}},
  "li ":{text:"banana"},
}
```

### Components / Partials

```js
import header from "./header.v.js"; //function type
import footer from "./footer.v.js"; //object type

{
  div: header({ user: "dim24" }),
  p: { text: "this is text" },
  div: footer,
}.render;
```

header.v.js

```js
export default ({ user }) => ({ h1: { text: `Hi, ${user}` } });
```

footer.v.js

```js
export default {
  script: { src: "/assets/js/main.js" },
  span: { text: "this is footer" },
};
```

### Style

use camel case to css properties

#### inline CSS:

```js
{
  h1:{
    text:"Hello World",
    style:{
      color:"#1B73F8",
      fontSize:"150%"
    }.cssText
  }
}
```

use style :

`global-style.js`:

```js
export default {
  h1: {
    color: "red",
  },
  body: {
    margin: "0px",
    textAlign: "center",
  },
};
```

why should use object css rather than direct css?

we can easily modify the style

`main-page.js`:

```js
import style from "./global-style.js";

style.body.margin = "12px";

{
  style:style.css,
  div:{
    h1:{text:"Hello World!"}
  }
}.render
```

### Interacting with DOM

use `script` to interact with browser with **html** property

wrap the script with a function, or use string

```js
{
  button:{onclick:"sayHi(this)",id:"hi-button"},
  script:{
    html(){
      document.getElementById("hi-button").innerText="Click me!";

      function sayHi(el){
        el.innerText="Hi!";
      }
    }
  }
}

```

### Event

you can add an event `this` keyword always refered to the node itseft

```js
{
  input:{type:"password",onkeypress(){
    if(event.keyCode==13)
    alert(this.value)
  }},
  button:{text:"Click me!",onclick(){
    this.innerText = this.innerText=="clicked"?"Click me!":"clicked";
  }}
}
```

## Repulse

If you already have an html file and want to modify it, or make it as a template, just use this

> this function is still has a lot issues, use only in a simple case

- need to wrap all tag into a single parent
- recommended to use external script and css
- repetitive / nested could caused weird behavior (help me, please!)

I still try to improve this feature. **if you can provide some help** just tell me please... :)

```js
const { div } = `
<div>
    <h1>Hello dims!</h1>
</div>
`.repulse;

div.id = "main";
div.h1.class = "heading";
div.p = { text: "this is a whole text" };

console.log({ div }.render);
```

result

```html
<div id="main">
  <h1 class="heading">Hello dims!</h1>
  <p>this is a whole text</p>
</div>
```

## Pass Value

use function

```js
console.log(((user) => ({ h1: { text: `Hello, ${user}` } }))("Vins").render);
```

or

```js
const greeting = (user) => ({ h1: `Hello, ${user}` });

console.log(greeting("Vins").render);
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

  {
    ul: {
      li: [].range(8, 1).map((item) => ({ text: "data-" + item })),
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

## templating

this example use single file usage. for modular usage leave to you, or just read the example dir

```js
//template file
const template = (content) => ({
  div: {
    class: "main wrapper",
    div: content,
  },
});

//content file
template({
  h1: { text: "Hello World!" },
});
```
