require("express-async-errors");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const notesRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const mongoUrl = config.MONGODB_URI;
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to MongoDB", mongoUrl);
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());

app.use(middleware.getTokenFrom);
app.use("/api/blogs", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token"
    });
  } else if (error.name === "SyntaxError") {
    return response.status(400).json({ error: "invalid JSON syntax" });
  }

  next(error);
};

app.use(errorHandler);

module.exports = app;
