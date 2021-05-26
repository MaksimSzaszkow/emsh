/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const cors = require("cors");
const Javascript = require("./generators/javascript");
const CSharp = require("./generators/csharp");
const CoreTranspiler = require("./CoreTranspiler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/javascript", (req, res) => {
  const t = new CoreTranspiler(req.body.code);
  t.Transpile();
  res.json(t.ECO);
});

app.post("/csharp", (req, res) => {
  const csharp = new CSharp(req.body.code);
  res.json(csharp.code);
});

app.listen(3000);
