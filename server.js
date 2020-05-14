const mongoose = require('mongoose');
const dotenv = require('dotenv');

//uncaught exception dealer (exception in synchronous code)
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCPETION!💥 Shutting down...');
  console.log(err.name, err.message);
  //process.exit(1);//Shuts down the entire application. We need to close server first and then the application
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '!PASSWORD!',
  process.env.DATABASE_PASSWORD
);

mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connections successful'));

const app = require('./app');
//console.log(process.env);
//Start the SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//Each time that there is an unhandled rejection, somewhere in our applicatiion  the process object will emit an event called unhandled rejection and so we can subscribe to that event as below.
//Global unhandled rejection dealer
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION!💥 Shutting down...');
  console.log(err.name, err.message);
  //process.exit(1);//Shuts down the entire application. We need to close server first and then the application
  server.close(() => {
    process.exit(1);
  });
});
