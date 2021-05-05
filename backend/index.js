/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const cors = require("cors");
// eslint-disable-next-line @typescript-eslint/camelcase
const { js_beautify } = require("js-beautify");
const pythonFormat = require("python-format");

const app = express();

app.use(cors());
app.use(express.json());

function howManyTabsAtStart(string) {
  let amount = 0;
  while (string.startsWith("\t")) {
    amount++;
    string = string.substring(1);
  }
  return [amount, string];
}

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/javascript", (req, res) => {
  console.log(req.body);
  const code = req.body.code.split("\n");
  let level = 0;
  let declarations = "";
  let current = "";
  code.forEach((line) => {
    const [newLevel, newLine] = howManyTabsAtStart(line);
    if (newLevel > level) {
      current = `${current}{`;
      level = newLevel;
    } else if (newLevel < level) {
      current = `${current}}`;
      level = newLevel;
    }
    if (newLine.startsWith("if")) {
      const [, condition] = newLine.split(" ");
      current = `${current}if(${condition})`;
    } else if (newLine.includes("=")) {
      console.log("declaration");
      const [variable, value] = newLine.split("=").map((e) => e.trim());
      declarations = `${declarations}${variable} = ${value};`;
    } else {
      console.log("executional");
      console.log(newLine);

      if (newLine.startsWith("log")) {
        const [, log] = newLine.split(" ");
        current = `${current}console.log(${log})`;
      }
    }
  });
  while (level > 0) {
    current = `${current}}`;
    level--;
  }
  console.log(`${declarations} ${current}`);
  console.log(js_beautify(`${declarations} ${current}`));
  res.json({ code: js_beautify(`${declarations} ${current}`) });
});

app.listen(3000);
