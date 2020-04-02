var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);


//With promise

const handleRegistrationMail = (req,res) => {
    const {name, email} = req.body;
    console.log(email)
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: {
          personalizations: [
            {
              to: [
                {
                  email: 'gabriel.vlasceanu@outlook.com',
                },
              ],
              subject: 'Hello World from the SendGrid Node.js Library!',
            },
          ],
          from: {
            email: 'test@example.com',
          },
          content: [
            {
              type: 'text/plain',
              value: 'Hello, Email!',
            },
          ],
        },
      });

    sg.API(request)
    .then(response => {
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
        res.json('mail sent')
    })
    .catch(error => {
        //error is an instance of SendGridError
        //The full response is attached to error.response
        console.log(error.response.statusCode);
    });
}

module.exports = {
    handleRegistrationMail: handleRegistrationMail
}