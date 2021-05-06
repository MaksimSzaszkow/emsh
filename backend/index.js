/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const cors = require("cors");
const Checker = require("./checks");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/javascript", (req, res) => {
  const checker = new Checker(req.body.code);
  console.log(checker.code);
  res.json(checker.code);
});

app.listen(3000);
