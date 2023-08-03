import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

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
        res.status(200).json({ message: 'Login successful.' });


    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};





