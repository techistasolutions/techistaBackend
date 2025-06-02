
import nodemailer from 'nodemailer';
import { Contact } from '../models/contactSchema.js';

export const contactInfo = async (req, res) => {
  try {
    const { fullName, lastName, phone, email, message } = req.body;
console.log(req.body);

    // Validation
    if (!fullName || !lastName || !phone || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Save to DB
    const newContact = new Contact({ fullName, lastName, phone, email, message });
    await newContact.save();

    // Send email to admin
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or use SMTP
      auth: {
        user: process.env.ADMIN_EMAIL,       // set in .env
        pass: process.env.ADMIN_EMAIL_PASS   // set in .env
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Contact Message',
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${fullName} ${lastName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact Form Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
