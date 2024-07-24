const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("./database");
const moment = require("moment-timezone");

const IndexRouter = require("./routes/IndexRoute");
const featuresRouter = require("./routes/FeaturesRoute");
const overviewRouter = require("./routes/OverviewRoute");
const eventsRouter = require("./routes/EventsRoute");
const orderRouter = require("./routes/OrderRoute");
const taskRouter = require("./routes/TaskRoute");
const googleRouter = require("./routes/GoogleRoute");
const teamMemberRouter = require("./routes/TeamMemberRoute");
const TeamRosterRoute = require("./routes/TeamRosterRoute");
const ScheduleJobs = require("./schedule/ScheduleJobs");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", IndexRouter);
app.use("/features", featuresRouter);
app.use("/overview", overviewRouter);
app.use("/events", eventsRouter);
app.use("/order", orderRouter);
app.use("/task", taskRouter);
app.use("/teamMember", teamMemberRouter);
app.use("/teamRoster", TeamRosterRoute);

app.use("/google", googleRouter);

const PORT = process.env.PORT || 8080; // Use port 80 or the PORT environment variable

app.get("/status", (req, res) => {
  // You can perform any checks or logic here to determine the health status
  const isHealthy = true; // Example health check logic

  if (isHealthy) {
    res.status(200).json({ status: "ok" }); // Respond with HTTP 200 and a JSON indicating health
  } else {
    res.status(500).json({ status: "error" }); // Respond with HTTP 500 if not healthy
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

ScheduleJobs();

module.exports = app;
