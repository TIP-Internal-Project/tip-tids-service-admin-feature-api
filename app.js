const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("./database");
const moment = require('moment-timezone');

const indexRouter = require("./routes");
const featuresRouter = require("./routes/features");
const overviewRouter = require("./routes/overviewRoute");
const eventsRouter = require("./routes/eventsRoute");
const orderRouter = require("./routes/orderRoute");
const taskRouter = require("./routes/taskRoute");
const addEventRouter = require("./routes/addEventRoute");
const googleRouter = require("./routes/google");
const teamMemberRouter = require("./routes/teamMemberRoute");
const registrationRouter = require("./routes/registrationRoute.js");

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

app.use("/", indexRouter);
app.use("/features", featuresRouter);
app.use("/overview", overviewRouter);
app.use("/events", eventsRouter);
app.use("/order", orderRouter);
app.use("/task", taskRouter);
app.use("/teamMember", teamMemberRouter);
app.use("/registrations", registrationRouter);



app.use("/createEvent", addEventRouter);

app.use("/google", googleRouter);

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

const schedule = require('node-schedule');
const Event = require('./models/Event');

schedule.scheduleJob('*/5 * * * *', async () => {
  const now = new Date();
  // const manilaTime = new Date().toLocaleString("en-GB", { timeZone: "Asia/Manila" });

  const outdatedEvents = await Event.find({
    endDate: { $lt: now },
    status: { $nin: ['Completed', 'Archived'] },
  });

  for (const event of outdatedEvents) {
    if(new Date(event.endDate.setHours(event.endDate.getHours() + 12)) <= now){
      event.status = 'Completed';
      await event.save();
    }
  }
});

module.exports = app;
