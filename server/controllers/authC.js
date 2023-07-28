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
    res.status(200).json({ result, token });
  }
  catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


