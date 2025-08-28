const express = require("express");
const app = express();
const routes = require("./routes");

app.use(express.json());

app.use("/api", routes);  

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

module.exports = app;