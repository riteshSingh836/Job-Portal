import nodemailer from 'nodemailer';

async function sendMails(input) {

    console.log(input);
    // create transporter - SMTP (Simple Mail Transfer Protocol)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'riteshsingh836@gmail.com',
            pass: 'gsbn jfwg xwct jovv'
        },
    });

    // configure email content
    const mailOptions = {
        from: 'riteshsingh836@gmail.com',
        to: input,
        subject: 'Coding Ninjas',
        text: 'The world has enough coders; be a coding ninja!',
    };

    // Send the email
    try{
        const result = await transporter.sendMail(mailOptions);
        console.log("Email send to " + input);
    }catch(err) {
        console.log("Email sending failed " + err);
    }
}