const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// get routes for authentication
const authRoutes = require("./src/routes/auth");

const app = new express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);

app.use("/", (req, res, next) => {
  res.status(200).json({ message: "Welcome" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server started on: ${port}`);
});
