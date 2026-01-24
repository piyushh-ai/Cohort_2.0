const catMe = require("cat-me");
const express = require("express");

const cat = catMe();
const app = express();

app.get("/", (req, res) => {
  res.send(cat);
});
console.log(cat);

app.listen(3000);
