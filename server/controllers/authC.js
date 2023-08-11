import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Sign up user
export const SignUp = async (req, res) => {
  try {
    console.log('Received signup request:', req.body);
    // Check if the user already exists
    const { firstName, lastName, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      'test',
      {
        expiresIn: '1h'
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
export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Log the received email and password
    console.log('Received login request - Email:', email);
    console.log('Received login request - Password:', password);

    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found, return error
    if (!user) {
      return res.status(401).json({ message: 'User not found. Please check your email and password.' });
    }

    // Compare provided password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password. Please check your email and password.' });
    }

    // If user and password are valid, send success response
    // res.status(200).json({ message: 'Login successful.' });

    const token = jwt.sign(
      { email: user.email, id: user._id, firstName: user.firstName, lastName: user.lastName },
      'test',
      {
        expiresIn: '1h'
      }
    );
    res.status(200).json({ email , token , type: 'user'});

    
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};