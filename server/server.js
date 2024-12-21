const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(bodyParser.json());
app.post('/api/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = 
    {
        from: process.env.SMTP_USER,
        to: process.env.SMTP_MAIN, 
        subject, 
        text, 
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) 
        {
            console.error('Error sending email:', error);
            return res.status(500).send('Failed to send email.');
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully!');
    });
});

app.use(express.static(path.join(__dirname,'../client/dist')));

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.PORT_SMTP,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(port,() => {
    console.log(`Server running at ${process.env.PORT}`);
});