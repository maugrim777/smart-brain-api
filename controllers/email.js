const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function newUserEmail(req, res){
  const {name, email}=req.body
  console.log(email)
  const message = { 
    to : email, //email variable
    from : { email : 'gv.maugrim777@gmail.com' , name: 'Gabriel Vlasceanu'},
    message : `Hi there, ${name}`,
    subject : "Heeellllooooo!",
    text: `Hi ${name}! Thank you for registering to the FaceRecognitionApp! Glad you could join us!`,
    html: `<strong>Hi ${name}! Thank you for registering to the FaceRecognitionApp! Glad you could join us!</strong>`
  }
  console.log(message)
  sgMail.send(message).catch(err => console.log(err)).then((sent) => {
    console.log('mail sent')
    res.json('email sent')
  }).catch(error => {
      console.log(error);
      res.status(400).json(error)
  })
}

// Create email hash database login table and send email with link to user
const recoverPassword = (req, res, db, bcrypt) => {
  //check if email address was inserted in the input fiels
  const {email} = req.body;
    if (!email) {
        return res.status(400).json('incorrect form submission')
     }
    //select the correspondin email from the login table
    db.select('email').from('login')
        .where('email', '=', email)
        .then(data => {
          if (data[0]) {
            //insert hash in table column recovery_hash
            var hash = bcrypt.hashSync(email);
            hash = hash.replace(/\//g, "slash");
            db.select('email').from('login').where('email', '=', email).update({'recovery_hash':hash}).catch(err => console.log(err))
            //configure email message
            const message = { 
              to : email, //email variable
              from : { email : 'gv.maugrim777@gmail.com' , name: 'Gabriel Vlasceanu'},
              message : `Link to reset password`,
              subject : "Link to reset password",
              text: `You are receiving this message beacuse you (or someone else) have requested the reset of the password for your Face Recognition App account\n\n
              Please click on the following link, or paste this into your browser to complete the process:https://face-recognition-maugrim777.herokuapp.com/reset/${hash} \n\n
              If you did not request this, please ignore this email and your password will remain unchanged.\n`,
              html: `<h4>Heelllooooo!</h4><br>
                    <p>You are receiving this message beacuse you (or someone else) have requested the reset of the password for your <strong>Face Recognition App</strong> account.\n\n</p><br>
                    <p>Please click on the following link, or paste this into your browser to complete the process:<a href="https://face-recognition-maugrim777.herokuapp.com/reset/${hash}">Reset Password</a></p><br>
                    <p>If you did not request this, please ignore this email and your password will remain unchanged.\n<p><br>`
            }
            sgMail.send(message).catch(err => console.log(err)).then((sent) => {
              res.json('email sent')
            }).catch(error => {
                console.log(error);
                res.status(400).json(error)
            })

            // email address does not exist in login table
          } else {res.json('email address does not exist')}
        }).catch(err => res.status(400).json('eroare'+error))
}

function resetPassword(req, res,db, bcrypt){

  const {hash, password} = req.body;
  let hashedPass = bcrypt.hashSync(password);
  
  db.select('recovery_hash').from('login').where('recovery_hash', '=', hash).update({'hash':hashedPass}).then(res.json('successfully updated password')).catch(err => console.log(err))

}

module.exports = {newUserEmail , recoverPassword, resetPassword}


