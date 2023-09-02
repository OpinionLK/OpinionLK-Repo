import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OrganizationDetails, ClientDetails, ClientAuth } from '../models/Client.js';

// ...

export const OrganizationSignUp = async (req, res) => {
  try {
    console.log('Received organization signup request:', req.body);
    const { orgName, orgAddressLine1, orgAddressLine2, orgCity, orgState, orgZip, orgPhone, orgEmail, orgWebsite } = req.body;
    let organization = await OrganizationDetails.findOne({ orgEmail });

    // if (organization) {
    //   return res.status(400).json({ error: 'Organization already exists' });
    // }

    // Create an organization record
    const result = await OrganizationDetails.create({
      orgName,
      orgAddressLine1,
      orgAddressLine2,
      orgCity,
      orgState,
      orgZip,
      orgPhone,
      orgEmail,
      orgWebsite
    });

    return res.status(200).json({ result });

    // Create and send JWT token
    // const token = jwt.sign(
    //   { orgEmail: result.orgEmail, id: result._id },
    //   'test', // Replace this with a secure secret key
    //   {
    //     expiresIn: '3d'
    //   }
    // );

    // res.status(200).json({ orgEmail, token });

  } catch (error) {
    console.error('Error signing up organization:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ...

export const ClientData = async (req, res) => {
  try {
    console.log('Received client signup request:', req.body);

    const { firstName, lastName, position, department, phone, nic} = req.body;
    let user = await ClientDetails.findOne({ nic });

    // if (user) {
    //   return res.status(400).json({ error: 'User already exists' });
    // }

    const result = await ClientDetails.create({
      firstName,
      lastName,
      position,
      department,
      phone,
      nic,
    });

    return res.status(200).json({ result });

    // const token = jwt.sign(
    //   { nic: result.nic, id: result._id },
    //   'test', // Replace this with a secure secret key
    //   {
    //     expiresIn: '3d'
    //   }
    // );

    // res.status(200).json({ nic, token });

  } catch (error) {
    console.error('Error signing up client:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ...

export const ClientSignUp = async (req, res) => {
  try {
    console.log('Received client signup request:', req.body);

    const { email, password, confirmPassword } = req.body;
    let user = await ClientAuth.findOne({ email });

    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 12);
    const result = await ClientAuth.create({
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      'test', // Replace this with a secure secret key
      {
        expiresIn: '3d'
      }
    );

    res.status(200).json({ email, token });

  } catch (error) {
    console.error('Error signing up client:', error);
    res.status(500).json({ error: 'Server error' });
  }
};






//.............................................................

export const ClientLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Log the received email and password
    console.log('Received login request - Email:', email);
    console.log('Received login request - Password:', password);

    // Find the user by email
    const user = await ClientAuth.findOne({ email });

    // If user not found, return error
    if (!user) {
      return res.status(401).json({ message: 'User not found. Please check your email and password.' });
    }
    console.log('User found:', user);
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
    res.status(200).json({ email , token , type: 'client'});
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// ........................................................................

export const OrganizationUserData = async (req, res) => {
  // Fetch organization data based on req.organization.id
};

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
