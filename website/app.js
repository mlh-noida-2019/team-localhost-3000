const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const QRCode = require('qrcode');
const request = require('request');
const sgMail = require('@sendgrid/mail');

const app = express();

const SENDGRID_API_KEY = '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';
sgMail.setApiKey(SENDGRID_API_KEY);

require('./config/dbconnection');
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

let User = require("./models/User");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/signup", (req, res) => {
  res.render("register", {
    message: ''
  });
});

app.get("/login/:username", (req, res) => {
  let username = req.params.username;
  console.log(username)
  User.findOne({username: username}, (err, user) => {
    if (err) {
      console.log("err");
      res.render('register', {message:''});
    }
    var url = "https://api.github.com/users/" + user.username;
    var options = {
      url: url,
      headers: {
        'User-Agent': 'request'
      }
    };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log(info);
        var url1 = 'https://api.github.com/orgs/' + user.college + '/members';
        var options1 = {
          url: url1,
          headers: {
            'User-Agent': 'request'
          }
        };

        function call(error, response, body) {
          if (!error && res.statusCode == 200) {
            var data = JSON.parse(body);
            console.log(data);
            res.render('profile', {info,user,data});
          }
        }
        request(options1, call);
      }
    }
    request(options, callback);
  });
});

app.post("/signup", (req, res) => {
  var username = req.body.username;
  User.findOne({
    username: username
  }, (err, us) => {
    if (err) {
      res.render('register', {message:''});
    };
    if (us) {
      res.render('register', {
        message: 'You are already registered'
      });
    } else if (!us) {
      var url = "https://api.github.com/users/" + username;
      User.create(req.body, (err, user) => {
        if (err) {
          res.render('register', {message:''});
        }
        var options = {
          url: url,
          headers: {
            'User-Agent': 'request'
          }
        };

        function callback(error, response, body) {
          if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            // console.log(info);
            var url1 = 'https://api.github.com/orgs/' + user.college + '/members';
            var options1 = {
              url: url1,
              headers: {
                'User-Agent': 'request'
              }
            };

            function call(error, response, body) {
              if (!error && res.statusCode == 200) {
                var data = JSON.parse(body);
                console.log(data);
                res.render('profile', {
                  info,
                  user,
                  data
                })
              }
            }
            request(options1, call);
          }
        }
        request(options, callback);
      });
    }
  });
});

app.get("*", (req, res) => {
  res.send("Page Not Found, 4{}4");
});

app.listen(process.env.PORT || 3000, process.env.IP, function() {
  console.log("server running");
});
