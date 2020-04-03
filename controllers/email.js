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
      // Awesome Logic to check if mail was sent
    }).catch(error => {
        console.log(error);
        res.status(400).json(error)
    })
   }


module.exports = {newUserEmail}