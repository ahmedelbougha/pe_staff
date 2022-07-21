const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// authorization middleware
const corsMiddleware = require("./src/middleware/cors");
const errorHandlingMiddleware = require("./src/middleware/error");
const isAuthMiddleware = require("./src/middleware/is-auth");

// get routes for authentication
const authRoutes = require("./src/routes/auth");

const app = new express();
app.use(bodyParser.json());

//cors middleware
app.use(corsMiddleware);

app.use("/auth", authRoutes);

app.use("/", isAuthMiddleware, (req, res, next) => {
  try {
    res.status(200).json({ message: "Welcome" });
  } catch (error) {
    next(error);
  }
});

// error handling middleware
app.use(errorHandlingMiddleware)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server started on: ${port}`);
});
