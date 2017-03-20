// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser  = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./config');

const UserRepository = require('./data/UserRepository');

const app = express();

//Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
//Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));
//more setup
app.set('superSecret', config.secret);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let userRepo = new UserRepository();

//Setup routes
app.post('/api/login', (req, res) => {
  let {username, password} = req.body;
  console.log(req.body);
  //validate username & password
  userRepo.authenticate(username, password).then(user => {
      if(user){
          res.json({
              success: true,
              token: jwt.sign(username, app.get('superSecret'))
          });
      }
      else{
          res.json({
              success: false
          });
      }
  })
  .catch(e => res.json({success: false}));

});
app.post('/api/register', (req, res) => {
    let {username, userid, password, email} = req.body;
    userRepo.insert({username, userid, password, email})
        .then(r => {
            res.json({
                success: true,
                token: jwt.sign(username, app.get('superSecret'))
            });
        })
        .catch(e => {
            res.json({
                success: false
            });
        });
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;