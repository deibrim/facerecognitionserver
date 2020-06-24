const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'ozzy',
    database: 'smart-brain'
  }
});

db.select('*')
  .from('users')
  .then(data => {});

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send("We are live");
});
app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
  profile.handleUserProfile(req, res, db);
});

app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});
app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () =>
  console.log('The server is Running')
);
