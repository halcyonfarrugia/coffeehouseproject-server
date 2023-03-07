const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASSWORD,
    },
});

const handleEnquiry = async (req, res) => {
    console.log(req.body)
    try {
        
        const { name, email, subject, description } = req.body;
        
        let mailOptions = {
            from: process.env.MAIL_EMAIL, // sender address
            to: process.env.MAIL_EMAIL, // list of receivers
            subject: `New enquiry made by ${name} - Subject: ${subject}`,
            text: description,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
            console.log(error);
            return res.status(500).json({
                status: 'error',
                message: 'An error occurred while sending the email.',
            });
            } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).json({
                status: 'success',
                message: 'Enquiry successfully submitted.',
            });
            }
        });
    } catch (error) {
        console.log(`Error occurred in ${__filename}: `, error)
        console.log(error)
    }
};

module.exports = { handleEnquiry }