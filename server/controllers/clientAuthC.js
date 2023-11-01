import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Clients } from '../models/Client.js';
import nodemailer from 'nodemailer';

// Sign up client
export const ClientSignUp = async (req, res) => {
  // #swagger.tags = ['Organisation']
  // #swagger.description = 'Endpoint to sign up organisation'

  try {
    console.log('Received client signup request:', req.body);

    const {
      orgName,
      orgAddressLine1,
      orgAddressLine2,
      orgCity,
      orgState,
      orgZip,
      orgPhone,
      orgEmail,
      orgWebsite,
      firstName,
      lastName,
      position,
      department,
      phone,
      nic,
      email,
      password,
      confirmPassword,
    } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: {
        name: 'Opinion.lk',
        address: process.env.USER,
      },
      to: email,
      subject: 'Welcome to OpinionLK',
      text: `Hello ${firstName} ${lastName},\n\nWelcome to OpinionLK! We're thrilled to have you on board. It's time to connect with us and join the OpinionLK community.`,
      html: `<p>Hello ${firstName} ${lastName},</p><p>Welcome to OpinionLK! We're thrilled to have you on board. It's time to <a href='https://opinionlk.me'>log into your account</a> and join the OpinionLK community.</p>`,
    };

    const sendMail = async (transporter, mailOptions) => {
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
        return { success: true, message: 'Email sent successfully' };
      } catch (error) {
        console.log(error);
        return { success: false, message: 'Email sent failed' };
      }
    };

    const user = await Clients.findOne({ email });

    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 12);

    const result = await Clients.create({
      orgName,
      orgAddressLine1,
      orgAddressLine2,
      orgCity,
      orgState,
      orgZip,
      orgPhone,
      orgEmail,
      orgWebsite,
      firstName,
      lastName,
      position,
      department,
      phone,
      nic,
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      'test', // Replace this with a secure secret key later
      {
        expiresIn: '3d',
      }
    );

    const emailResult = await sendMail(transporter, mailOptions);

    if (emailResult.success) {
      res.status(200).json({ email, token });
      console.log('Client signup successful:', result);
    } else {
      res.status(500).json({ error: 'Failed to send confirmation email' });
    }
  } catch (error) {
    console.error('Error signing up client:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const ClientData = async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint to get user data'
  // get token from header

  const authHeader = req.headers.authorization;

  // Check if the authorization header is missing or not in the expected format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Received client data request:', token);

  // check if token is verified
  if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
  }


  // verify token
  try {
      const { id } = jwt.verify(token, 'test');
      console.log(id);

      if (!id) {
          return res.status(400).json({ error: 'Server Error' });
      }
      let user = await Clients.findOne({ _id: id });
      res.status(200).json({
          id: user._id, firstname: user.firstName, lastname: user.lastName, email: user.email
      });
  } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
          return res.status(401).json({ error: 'Unauthorized' });
      }else{
        console.log(error)
        return res.status(401).json(error);
      }
  }

};