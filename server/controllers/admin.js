import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import {Clients} from '../models/Client.js';
import User from '../models/User.js';

export const getAllSurveyees = async (req, res) => {

    try {
        let users = await User.find();
        res.status(200).json({ users });
        console.log("users: ", users);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }

};

export const getAllClients = async (req, res) => {

    try {
        let clients = await Clients.find();
        res.status(200).json({ clients });
        console.log("clients: ", clients);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }

}
