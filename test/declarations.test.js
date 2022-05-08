const fs = require("fs");
const plugin = require(`${__dirname}/../index`);
const pluginTester = require("babel-plugin-tester").default;

// test declarations.js
let code = fs.readFileSync(`${__dirname}/js/declarations.js`, {
  encoding: "utf8",
});
let output = `
var d1 = 100;
var d2 = {
  hoge: "hoge",
};
var d3 = [
  0,
  1,
  {
    piyo: "piyo",
  },
];

var d4 = function () {
  var d44 = 100;
  console.log(d44);
};

export { d1, d2, d3, d4 };`;

pluginTester({
//   formatResult: (r) => r,
  plugin,
  tests: [
    {
      code,
      output,
    },
  ],
});
