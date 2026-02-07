import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Contact from '../models/Contact.js';

dotenv.config();
const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        await newContact.save();

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `New Contact from ${name}: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Message sent and saved successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to send message' });
    }
});

export default router;