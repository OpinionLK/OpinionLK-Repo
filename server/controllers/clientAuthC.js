import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Client from '../models/Client.js';

// Sign up user
export const ClientSignUp = async (req, res) => {
  try {
    console.log('Received signup request:', req.body);
    // Check if the user already exists
    const { firstName, lastName, email, password } = req.body;
    let user = await Clinet.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await Client.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { email: result.email,
         id: result._id },
      'test',
      {
        expiresIn: '3d'
      }
    );
    res.status(200).json({ email, token });
  }

  catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Login user
export const ClientLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Log the received email and password
    console.log('Received login request - Email:', email);
    console.log('Received login request - Password:', password);

    // Find the user by email
    const client = await Client.findOne({ email });

    // If user not found, return error
    if (!client) {
      return res.status(401).json({ message: 'User not found. Please check your email and password.' });
    }

    // Compare provided password with hashed password
    const isPasswordValid = await bcrypt.compare(password, client.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password. Please check your email and password.' });
    }

    // If user and password are valid, send success response
    // res.status(200).json({ message: 'Login successful.' });

    const token = jwt.sign(
      { email: client.email, _id: client._id, firstName: client.firstName, lastName: client.lastName },
      'test',
      {
        expiresIn: '3d'
      }
    );
    res.status(200).json({ email, id: client.id, token, type: 'client' });


  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// get user data

export const ClientUserData = async (req, res) => {
    try {
      const {
        _id,
        firstName,
        lastName,
        email,
        profilePicture,
      } = await Client.findById(req.client.id);

      res.status(200).json({
        _id,
        firstName,
        lastName,
        email,
        profilePicture,
        role : 'client'
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }

  // res.status(200).json({ message: 'User data received.' });

}