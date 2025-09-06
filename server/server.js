const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
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
            // Log more diagnostic info to help troubleshoot
            console.error('Error sending email:', error?.message || error);
            if (error?.response) console.error('SMTP response:', error.response);
            return res.status(500).json({
                error: 'Failed to send email',
                reason: error?.message || 'Unknown error',
            });
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully!');
    });
});

app.use(express.static(path.join(__dirname,'../client/dist')));

const smtpPort = Number(process.env.PORT_SMTP) || 587;
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: smtpPort,
    // Use secure for port 465, otherwise false (STARTTLS on 587)
    secure: smtpPort === 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
});

// Verify SMTP connection once on startup for clearer errors
transporter.verify((err, success) => {
    if (err) {
        console.error('SMTP verify failed:', err?.message || err);
    } else {
        console.log('SMTP server is ready to take messages');
    }
});

// (moved to bottom after API routes)

// MongoDB setup
const MONGODB_URI = process.env.MONGODB_URI || '';
const DB_NAME = process.env.DB_NAME || 'portfolio';
const COLLECTION_NAME = process.env.COLLECTION_NAME || 'projects';

let mongoClient;
async function getDb() {
    if (!MONGODB_URI) throw new Error('MONGODB_URI not set in environment');
    if (!mongoClient) {
        console.log('Connecting to MongoDB...');
        mongoClient = new MongoClient(MONGODB_URI);
        await mongoClient.connect();
        console.log('MongoDB connected');
    }
    return mongoClient.db(DB_NAME);
}


// API: fetch projects
app.get('/api/projects', async (req, res) => {
    try {
        const db = await getDb();
        const docs = await db.collection(COLLECTION_NAME)
            .find({})
            .toArray();

        let projects = [];
        if (docs.length === 1 && Array.isArray(docs[0].projects)) 
        {
            projects = docs[0].projects;
        }
        projects.sort((a, b) => (b?.dateValue || 0) - (a?.dateValue || 0));
        res.json(projects);
    } 
    catch (err) {
        console.error('Error fetching projects:', err.message);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, '../client/dist', 'index.html');
    if (fs.existsSync(indexPath)) {
        return res.sendFile(indexPath);
    }
    res
        .status(404)
        .send(
            'Frontend build not found at client/dist/index.html. In development, run "npm run dev" in the client folder and use a proxy for /api. For production, build the client with "npm run build" in the client folder.'
        );
});

app.listen(port, () => {
    console.log(`Server running at ${port}`);
    // Try to initialize MongoDB connection on startup to surface errors early
    getDb()
        .then(() => console.log('MongoDB ready'))
        .catch((err) => console.error('MongoDB connection error on startup:', err.message));
});