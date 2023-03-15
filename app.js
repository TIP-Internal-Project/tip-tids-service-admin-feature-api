const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('./database');
const port = 3000;

//edit
const eventRoutes = require('./routes/eventRoutes');

//edit model
// const TeamMembers = require('./models/TeamMember.js');

const indexRouter = require('./routes');
const featuresRouter = require('./routes/features');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/features', featuresRouter);

//edit app.use
app.use('/events', eventRoutes);



// // //edit team member test

// app.get('/team', async (req, res) => {
//   try {
//     const event = await TeamMembers.find();
//     res.status(200).json(event);
//   } catch(error) {

//   }
// });



//Routes
// app.post('/events', async (req, res)=>  {
//  try {
//   const event = await Event.create(req.body)
//   res.status(200).json(event);
//  } catch (error) {
//   console.log(error.message);
//   res.status(500).json({message: error.message})
//  }
// })


// //edit get post
// app.get('/events', async (req, res) => {
//   try {
//     const events = await Event.find();
//     res.status(200).json(events);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: error.message });
//   }
// });

// //edit get post with specific id
// app.get('/events/:id', async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
//     res.status(200).json(event);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: error.message });
//   }
// });

// // delete events
// app.delete('/events/:id', async (req, res) => {
//   try {
//     const event = await Event.findByIdAndDelete(req.params.id);
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
//     res.status(200).json({ message: 'Event deleted successfully' });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: error.message });
//   }
// });

// // update events
// app.patch('/events/:id', async (req, res) => {
//   try {
//     const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
//     res.status(200).json(event);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: error.message });
//   }
// });



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
