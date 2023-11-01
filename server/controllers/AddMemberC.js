import ComManager from "../models/ComManagerModel.js";
import nodemailer from 'nodemailer';
import crypto from "crypto";
import User from "../models/User.js";
import { DateTime } from 'luxon';
import Surveys from "../models/Surveys.js";
import Clients from "../models/Client.js";
import e from "express";

export const Getmembers = async (req, res) => {
     // #swagger.tags = ['Community Manager']
      // #swagger.description = 'Endpoint to get all community managers'
  const members = await ComManager.find();
  res.send(members);
};

export const Savemember = async (req, res) => {
  // #swagger.tags = ['Community Manager']
  const comPassword = crypto.randomBytes(10).toString('hex');
 
  const member = {
    ManagerFirstName: req.body.ManagerFirstName,
    ManagerLastName: req.body.ManagerLastName,
    ManagerAddLine1: req.body.ManagerAddLine1,
    ManagerAddLine2: req.body.ManagerAddLine2,
    ManagerDistrict: req.body.ManagerDistrict,
    email: req.body.ManagerEmail,
    ManagerPhone: req.body.ManagerPhone,
    ManagerNic: req.body.ManagerNic,
    password: comPassword,
  }

  // Check if the user with the same email already exists in ComManager
  let user = await ComManager.findOne({ email: member.email });

  if (user) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Create the nodemailer transporter
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
    from: {
      name: 'Opinion.lk',
      address: process.env.USER
    },
    to: req.body.ManagerEmail,
    subject: "Welcome to OpinionLK",
    text: `Hello ${req.body.ManagerFirstName} ${req.body.ManagerLastName},\n\nWelcome to OpinionLK! We're thrilled to have you on board. It's time to connect with us and join the OpinionLK community.`,
    html: `<p>Hello ${req.body.ManagerFirstName} ${req.body.ManagerLastName},</p><p>Welcome to OpinionLK! We're thrilled to have you on board. It's time to <a href='https://opinionlk.me'>log into your account </a> and join the OpinionLK community.</p>`,
  }

await ComManager.create(member)
  .then((data) => {
    console.log("Saved Successfully...");
    sendMail(transporter, mailOptions);
    res.status(201).send(data);
  })
  .catch((err) => {
    console.log(err);
    res.send({ error: err, msg: "Something went wrong!" });
  });
};
// Define the sendMail function
const sendMail = async (transporter, mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
    return {"message": "Email sent successfully"};
  } catch (error) {
    console.log(error);
    return {"message": "Email sent failed"};
  }
};

 
// Import necessary modules and models

export const Updatemember = async (req, res) => {
  try {
    const { id } = req.params;
    const memberUpdates = {
      ManagerFirstName: req.body.ManagerFirstName,
      ManagerLastName: req.body.ManagerLastName,
      ManagerAddLine1: req.body.ManagerAddLine1,
      ManagerAddLine2: req.body.ManagerAddLine2,
      ManagerDistrict: req.body.ManagerDistrict,
      ManagerEmail: req.body.ManagerEmail,
      ManagerPhone: req.body.ManagerPhone,
      ManagerNic: req.body.ManagerNic,
    };

    // Find the community manager by ID and update with memberUpdates
    const updatedMember = await ComManager.findByIdAndUpdate(id, memberUpdates, {
      new: true, // Returns the updated document
      runValidators: true, // Run model's validation on update
    });

    if (!updatedMember) {
      return res.status(404).json({ error: "Community manager not found" });
    }
    console.log('Manager updated successfully')
    return res.status(200).json({ message: "Updated successfully", updatedMember });
  } catch (error) {
    console.error("Error updating manager:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};


export const Deletemember = (req, res) => {
  const { id } = req.params;

  ComManager.findByIdAndDelete(id)
    .then(() => res.send("Deleted successfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

export const Usersignups = async (req, res) => {
  try {
    const currentDate = DateTime.local(); // Current date and time
    const thirtyDaysAgo = currentDate.minus({ days: 30 }); // 30 days ago

    // Find users signed up within the last 30 days
    const userSignups = await User.find({
      createdAt: { $gte: thirtyDaysAgo.toJSDate() }
    });
    console.log('userSignups:', userSignups);
    // Prepare data for the line graph
    const labels = []; // Labels for the X-axis (e.g., dates)
    const userData = []; // User count data for the Y-axis

    // Count user signups for each day within the last 30 days
    for (let i = 0; i < 30; i++) {
      const date = thirtyDaysAgo.plus({ days: i });
      const nextDate = date.plus({ days: 1 });
      const usersOnDay = userSignups.filter(user => {
        const createdAt = DateTime.fromJSDate(user.createdAt);
        return createdAt >= date && createdAt < nextDate;
      });
      labels.push(date.toLocaleString(DateTime.DATE_SHORT));
      userData.push(usersOnDay.length);
    }

    // Prepare the response object
    const data = {
      labels,
      datasets: [
        {
          label: 'User Signups',
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#fff',
          borderColor: '#4318FF',
          borderWidth: 3,
          data: userData
        }
      ]
    };

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const TotalSurvey = async (req, res) => {
  try {
    // Count the number of surveys
    const surveyCount = await Surveys.countDocuments();
    // Send the surveyCount in the response data
    res.json({ surveyCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const Totalusers = async (req, res) => {
  try {
    // Count the number of users
    const userCount = await User.countDocuments();
    // Send the userCount in the response data
    res.json({ userCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const TotalClients = async (req, res) => {
  try {
    // Count the number of clients
    const clientCount = await Clients.countDocuments();
    // Send the clientCount in the response data
    res.json({ clientCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const AprovalStatus = async (req, res) => {
  try {
    const approvedCount = await Surveys.countDocuments({ approvalStatus: 'approved' });
    const pendingCount = await Surveys.countDocuments({ approvalStatus: 'pending' });
    const draftCount = await Surveys.countDocuments({ approvalStatus: 'draft' });

    const statusCounts = {
      approved: approvedCount,
      pending: pendingCount,
      draft: draftCount,
    };
    res.status(200).json(statusCounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const Clientsignups = async (req, res) => {
  try {
    const currentDate = DateTime.local(); // Current date and time
    const thirtyDaysAgo = currentDate.minus({ days: 30 }); // 30 days ago

    // Find users signed up within the last 30 days
    const clientSignups = await Clients.find({
      createdAt: { $gte: thirtyDaysAgo.toJSDate() }
    });

    // Prepare data for the line graph
    const labels = [];
    const clientData = [];

    // Initialize an object to count client signups for each day
    const clientCountByDate = {};

    // Count user signups for each day within the last 30 days
    for (let i = 0; i < 30; i++) {
      const date = thirtyDaysAgo.plus({ days: i });
      const nextDate = date.plus({ days: 1 });
      const clientsOnDay = clientSignups.filter(client => {
        const createdAt = DateTime.fromJSDate(client.createdAt);
        return createdAt >= date && createdAt < nextDate;
      });

      // Store the count in the object
      clientCountByDate[date.toFormat('yyyy-MM-dd')] = clientsOnDay.length;
    }

    // Extract labels and data from the object
    for (let i = 0; i < 30; i++) {
      const date = thirtyDaysAgo.plus({ days: i });
      labels.push(date.toLocaleString(DateTime.DATE_SHORT));
      clientData.push(clientCountByDate[date.toFormat('yyyy-MM-dd')]);
    }

    // Prepare the response object
    const data = {
      labels,
      datasets: [
        {
          label: 'Client Signups',
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#fff',
          borderColor: '#4318FF',
          borderWidth: 3,
          data: clientData
        }
      ]
    };

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

