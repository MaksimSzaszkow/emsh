/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const cors = require("cors");
const Javascript = require("./compilers/javascript");
const CSharp = require("./compilers//csharp");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/javascript", (req, res) => {
  const js = new Javascript(req.body.code);
  res.json(js.code);
});

app.post("/csharp", (req, res) => {
  const csharp = new CSharp(req.body.code);
  console.log(csharp.code);
  res.json(csharp.code);
});

app.listen(3000);
