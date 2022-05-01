const fs = require("fs");
const plugin = require(`${__dirname}/../index`);
const pluginTester = require("babel-plugin-tester").default;

// test declarations.js
let code = fs.readFileSync(`${__dirname}/js/declarations.js`, {
  encoding: "utf8",
});
let expected = `
var d1 = 100;
var d2 = {
  hoge: "hoge",
};
var d3 = [0, 1, { piyo: "piyo" }];
export { d1, d2, d3 };`;

pluginTester({
  plugin,
  formatResult: (r) => r,
  tests: [
    {
      code,
      output: expected,
    },
  ],
});

// test functions.js
code = fs.readFileSync(`${__dirname}/js/functions.js`, { encoding: "utf8" });
expected = `
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
  }
};
export { a, b, c, d };`;

pluginTester({
  plugin,
  formatResult: (r) => r,
  tests: [
    {
      code,
      output: expected,
    },
  ],
});
