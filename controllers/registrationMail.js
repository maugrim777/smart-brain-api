const sgMail = require('@sendgrid/mail');

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey('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');


const handleRegistrationMail = (req, res) => {
    const {name, email} = req.body;
    console.log(email, name)
    const msg = {
        to: email,
        from: 'registration@facerecognitionapp.com',
        subject: `Hellloooo! `,
        text: `Hello. So glad you registered in my little app. Have fun!`
    };
    sgMail.send(msg).then(response => res.json(response)).catch(err => res.status(400).json('couldn\'t send mail'))
    
}


module.exports = {
    handleRegistrationMail:handleRegistrationMail
}