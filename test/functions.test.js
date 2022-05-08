const fs = require("fs");
const plugin = require(`${__dirname}/../index`);
const pluginTester = require("babel-plugin-tester").default;

let code = fs.readFileSync(`${__dirname}/js/functions.js`, {
  encoding: "utf8",
});
let output = `
function a() {
  console.log("a");
}

function b() {
  console.log("b");

  function bb() {
    console.log("bb");
  }
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
  formatResult: (r) => r,
  plugin,
  tests: [
    {
      code,
      output,
    },
  ],
});
