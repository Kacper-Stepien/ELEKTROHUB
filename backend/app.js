const express = require("express");
const dotenv = require("dotenv");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from the server side!");
});

module.exports = app;
