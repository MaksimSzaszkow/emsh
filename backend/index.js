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
  res.json(new Javascript(req.body.code).code);
});

app.post("/csharp", (req, res) => {
  res.json(new CSharp(req.body.code).code);
});

app.listen(3000);
