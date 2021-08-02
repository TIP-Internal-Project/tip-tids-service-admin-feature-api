const config = require('./config/config');
const mongoose = require('mongoose');
require('./models/Feature');

mongoose.connect(config.databaseUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log("Database connection established");
  console.log('Collections:');
  mongoose.connection.db.listCollections().toArray((err, names) => {
    if (err) {
      console.log(err);
    } else {
      names.forEach((e,i,a) => {
        console.log("-->", e.name);
      });
    }
  });
});