# babel-plugin-export-window-declarations
this plugin exports top-level variables.

### The problem 🤨
Legacy browser source code is written as script, making it difficult to test, bundle, etc.

### This solution ✅
To solve this problem, this plugin exports top-level variables.

### installation 
```bash
npm i -D babel-plugin-export-window-declarations
```

## example
```javascript
function a() {
  console.log("a");
}

function b() {
  console.log("b");
}

var c = function () {
  console.log("c");
};

var d = function (name) {
  this._name = name;
};

d.prototype = {
  _call: function () {
    console.log(this._name);
  },
};

// Insert the following code
export { a, b, c, d };
```

## Usage

```javascript
const { transform } = require("@babel/core");
const fs = require("fs");
const files = ["./sources/declarations.js", "./sources/functions.js"];

files
  .map((file) => fs.readFileSync(file, { encoding: "utf8" }))
  .forEach((src) => {
    const { code } = transform(src, {
      plugins: [require("babel-plugin-export-window-declarations")],
    });
    console.log(code);
  });

```