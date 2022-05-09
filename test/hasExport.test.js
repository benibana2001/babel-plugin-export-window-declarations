const fs = require("fs");
const plugin = require(`${__dirname}/../index`);
const pluginTester = require("babel-plugin-tester").default;

let code = fs.readFileSync(`${__dirname}/js/hasExport.js`, {
  encoding: "utf8",
});
let output = `
export function abc() {
  console.log("abd");
}
const abcd = 100;
export { abcd };`;

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
