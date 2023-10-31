import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { Clients } from '../models/Client.js';
import ComManager from '../models/ComManagerModel.js';
import Admin from '../models/Admin.js';
import nodemailer from 'nodemailer';

// Sign up user
export const SignUp = async (req, res) => {
  try {
    console.log('Received signup request:', req.body);
    // Check if the user already exists
    const { firstName, lastName, email, password } = req.body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
      tls: {
          rejectUnauthorized: false
        }
    });

    const mailOptions = {
      from:{
          name: 'Opinion.lk',
          address: process.env.USER
      },
      to: email, 
      subject: "Welcome to OpinionLK",
      text: `Hello ${firstName} ${lastName},\n\nWelcome to OpinionLK! We're thrilled to have you on board. It's time to connect with us and join the OpinionLK community.`,
      html: `<p>Hello ${firstName} ${lastName},</p><p>Welcome to OpinionLK! We're thrilled to have you on board. It's time to <a href='https://opinionlk.me'>log into your account </a> and join the OpinionLK community.</p>`,
      // attachments: [
      //     {
      //       filename: 'simple.png',
      //       path: './simple.png',
      //       contentType: 'image/png'
      //     }
      //   ]
      }

      const sendMail = async (transporter,mailOptions) => {
          try {
              const info = await transporter.sendMail(mailOptions);
              console.log(info);
              res.status(200).json({"message": "Email sent successfully"}); // "Email sent successfully"
          } catch (error) {
              console.log(error);
              res.status(500).json({"message": "Email sent failed"}); // "Email sent failed"
          }
      }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      'test',
      {
        expiresIn: '1h'
      }
    );
    sendMail(transporter,mailOptions);
    res.status(200).json({ email, token });
  }

  catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Login user
export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Log the received email and password
    console.log('Received login request - Email:', email);
    console.log('Received login request - Password:', password);

    // Find the user by email
    const client = await Clients.findOne({ email });
    const user = await User.findOne({ email });
    const manager = await ComManager.findOne({ email });
    const admin = await Admin.findOne({ email });



    if (client) {
      console.log('Client found:', client);
      const isPasswordValid = await bcrypt.compare(password, client.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password. Please check your email and password.' });
      }

      const token = jwt.sign(
        { email: client.email, id: client._id },
        'test',
        {
          expiresIn: '1h'
        }
      );
      res.status(200).json({ email, token, type: 'client' });
    } else if (manager) {
      console.log('Manager found:', manager);
      // const isPasswordValid = await bcrypt.compare(password, manager.password);
      const isPasswordValid = password == manager.password;

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password. Please check your email and password.' });
      }

      const token = jwt.sign(
        { email: manager.email, id: manager._id },
        'test',
        {
          expiresIn: '1h'
        }
      );
      res.status(200).json({ email, token, type: 'manager' });
    } else if (admin) {
      console.log('Admin found:', admin);
      // const isPasswordValid = await bcrypt.compare(password, manager.password);
      console.log('password detected');
      const isPasswordValid = password == admin.password;

      if (!isPasswordValid) {
        return res.status(401).json({ 
          message: 'Invalid password. Please check your email and password.'});
      }

      const token = jwt.sign(
        { email: admin.email, id: admin._id },
        'test',
        {
          expiresIn: '1h'
        }
      );
      res.status(200).json({ email, token, type: 'admin' });
    } else if (user) {
      console.log('User found:', user);
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password. Please check your email and password.' });
      }

      console.log(user);
      const token = jwt.sign(
        { email: user.email, id: user._id, firstName: user.firstName, lastName: user.lastName },
        'test',
        {
          expiresIn: '1h'
        }
      );
      res.status(200).json({ email, token, type: 'user' });

    }

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};