import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Clients } from '../models/Client.js';

// Sign up client
export const ClientSignUp = async (req, res) => {
  try {
    console.log('Received client signup request:', req.body);

    const { orgName, orgAddressLine1, orgAddressLine2, orgCity, orgState, orgZip, orgPhone, orgEmail, orgWebsite, firstName, lastName, position, department, phone, nic, email, password, confirmPassword } = req.body;
    let user = await Clients.findOne({ email });

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
      confirmPassword: hashedConfirmPassword
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      'test', // Replace this with a secure secret key later
      {
        expiresIn: '3d'
      }
    );

    res.status(200).json({ email, token });
    console.log('Client signup successful:', result);

  } catch (error) {
    console.error('Error signing up client:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
