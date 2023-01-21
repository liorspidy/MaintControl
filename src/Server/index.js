const express = require('express');
const colors = require('colors');
const db = require('./db/index');
const fs = require("fs");

const PORT = 9000;

// connect middlware
const app = express();
app.use(express.json());

// load all routes
getDirectories = (path) => {
  return fs.readdirSync(path).filter((file) => {
    return fs.statSync(path + '/' + file).isDirectory();
  });
}

const directories = getDirectories('./routes');
directories.forEach((directory) => {
  fs.readdir('./routes/' + directory, (err, files) => {
    files.forEach((file) => {
      app.use('/', require(`./routes/` + directory + '/' + file));
    });
  });
});

//connect db
db.connectMaintControlDB();

//start server
app.listen(PORT, () => {
  console.log(colors.bgGreen(`Server listening on port ${PORT}`));
});