const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// authorization middleware
const corsMiddleware = require("./src/middleware/cors");
const errorHandlingMiddleware = require("./src/middleware/error");
const isAuthMiddleware = require("./src/middleware/is-auth");

// get routes for authentication
const authRoutes = require("./src/routes/auth");
// get routes for staff
const staffRoutes = require("./src/routes/staff");
// get routes for statistics
const statisticsRoutes = require("./src/routes/statistics");

const app = new express();
app.use(bodyParser.json());

//cors middleware
app.use(corsMiddleware);

app.use("/auth", authRoutes);
app.use("/staff", staffRoutes);
app.use("/statistics", statisticsRoutes);

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
