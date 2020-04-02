const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

// to be deleted
const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey('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')
sgMail.setApiKey('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')


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

