const mongoose = require('mongoose');
// Map global promises
mongoose.Promise = global.Promise;
// Mongoose Connect
// const connectionString = 'mongodb://localhost/mlhDB';
const connectionString = 'mongodb://hack:hack123@ds157971.mlab.com:57971/mlhdb'
mongoose.connect(connectionString, { useNewUrlParser: true })
    .then(function () {
        console.log("MongoDB Connected");
    })
    .catch(function (err) {
        console.log(err);
    });
