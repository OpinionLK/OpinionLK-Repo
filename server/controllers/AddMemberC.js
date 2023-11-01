import ComManager from "../models/ComManagerModel.js";
import nodemailer from 'nodemailer';
import { Clients } from '../models/Client.js';
import crypto from "crypto";
import nodemailer from "nodemailer";

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

  const existingMember = await ComManager.findOne({ email: member.email });
  if (existingMember) {
    res.status(400).json({ error: 'A member with this email already exists' });
    return;
  }
 
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
    to: member.email,
    subject: "Welcome to OpinionLK",
    text: `Hello ${member.ManagerFirstName} ${member.ManagerLastName},\n\nWelcome to OpinionLK! We're thrilled to have you on board. It's time to connect with us and join the OpinionLK community as a community manager. Your password is ${comPassword}`,
    html: `<p>Hello ${member.ManagerFirstName} ${member.ManagerLastName},</p><p>Welcome to OpinionLK! We're thrilled to have you on board. It's time to <a href='https://opinionlk.me'>log into your account </a> and join the OpinionLK community as a community manager.</p>`,
  }

<<<<<<< Updated upstream
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
  }

  // Check if the user with the same email already exists in ComManager
  let user = await ComManager.findOne({ ManagerEmail: req.body.ManagerEmail });

  if (user) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Create a new ComManager entry
  ComManager.create(member)
=======
        // attachments: [
      //     {
      //       filename: 'simple.png',
      //       path: './simple.png',
      //       contentType: 'image/png'
      //     }
      //   ]
 
  const sendMail = async (transporter,mailOptions) => {
      try {
          const info = await transporter.sendMail(mailOptions);
          console.log(info);
      } catch (error) {
          console.log(error);
      }
  }
 
  await ComManager.create(member)
>>>>>>> Stashed changes
    .then((data) => {
      const emailResult = sendMail(transporter, mailOptions);

      if (emailResult.message === "Email sent successfully") {
        console.log("Saved Successfully...");
      sendMail(transporter,mailOptions);
        res.status(201).send(data);
      } else {
        res.status(500).json({ error: "Failed to send confirmation email" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
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
