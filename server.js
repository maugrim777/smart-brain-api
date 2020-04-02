const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

// temp test
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const register = require('./controllers/register');
const signin = require('./controllers/signin')
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const faces = require('./controllers/faces');
const registrationMail = require('./controllers/registrationMail');

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true
    }
  }
);

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {res.json('Hellooo! Welcome to the Smart Brain App!')});
app.post('/signin', (req, res) => {signin.handleSignin(req,res,db,bcrypt)})
app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req,res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req,res)});
app.put('/faces', (req, res) => {faces.handleFaces(req,res, db)});
app.post('/registerMail', (req,res) => {registrationMail.handleRegistrationMail(req,res)})



app.listen(process.env.PORT || 3002, () => {
    console.log(`app is running on port ${process.env.PORT}`)
});



app.post('/sendMail', (req, res) => {
  const {email} = req.body;
  const msg = {
      to: email,
      from: 'test@test.com',
      subject: 'Hello real world',
      text: 'Hello plain world!',
      html: '<p>Hello HTML world!</p>',
    };
  sgMail.send(msg).then(data => console.log(data)).then(() => {res.json('message sent')}).catch(err => res.status(400).json('couldn\'t send mail'))
  
})

