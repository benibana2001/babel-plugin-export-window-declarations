const fs = require("fs");
const plugin = require(`${__dirname}/../index`);
const pluginTester = require("babel-plugin-tester").default;

let code = fs.readFileSync(`${__dirname}/js/jQuery.js`, {
  encoding: "utf8",
});
let output = `
$(function () {
  doSomething();
});

function doSomething() {
  console.log("do something");
}

jQuery.extend.fn = {
  doSomething: function () {
    console.log("jQuery.extend");
  }
};
export { doSomething };`;

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
