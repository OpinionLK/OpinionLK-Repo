import Surveys from '../models/Surveys.js';

export const getAllSurveys = async (req, res) => {
    try {
        const surveys = await Surveys.find();
        res.status(200).json(surveys);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    }
    
