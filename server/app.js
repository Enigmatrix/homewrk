// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser  = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./config');

const UserRepository = require('./data/UserRepository');
const ModuleRepository = require('./data/ModuleRepository');
const SlotRepository = require('./data/SlotRepository');
const HomeworkRepository = require('./data/HomeworkRepository');

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
let moduleRepo = new ModuleRepository();
let slotRepo = new SlotRepository();
let hwRepo = new HomeworkRepository();

//Setup routes
app.post('/api/login', (req, res) => {
  let {username, password} = req.body;
  console.log(req.body);
  //validate username & password
  userRepo.authenticate(username, password).then(user => {
      if(user){
          res.json({
              success: true,
              token: jwt.sign(user.userid, app.get('superSecret'))
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
                token: jwt.sign(userid, app.get('superSecret'))
            });
        })
        .catch(e => {
            res.json({
                success: false
            });
        });
});

let apiRoutes = express.Router();

apiRoutes.use(function(req, res, next){
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decodedUser = decoded;
                next();
            }
        });
    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});
app.use('/api', apiRoutes);

app.get('/api/schedule', (req, res) => {
    //convert start and end strings to mysql date strings
    let {start, end} = req.query;
    slotRepo.slotsInRange(start, end, req.decodedUser).then(slots => {
        res.json({slots});
    });
});

app.get('/api/modules', (req, res) => {
    moduleRepo.allModules(req.decodedUser).then(modules => {
        res.json(modules);
    });
});

app.get('/api/homework', (req, res) => {
    hwRepo.homeworkSummary(req.decodedUser).then(hwSummary => {
        res.json(hwSummary);
    });
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;