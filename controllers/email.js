const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function newUserEmail(req, res){
    const {name, email}=req.body
    console.log(email)
    const message = { 
    to : email, //email variable
    from : { email : 'gabriel.vlasceanu@outlook.com' , name: 'Gabriel Vlasceanu'},
    message : `Hi there, ${name}`,
    subject : "This is a test Email",
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>'
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