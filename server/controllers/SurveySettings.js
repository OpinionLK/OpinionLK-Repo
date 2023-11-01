import PlatformData from '../models/PlatformData.js';

export const GetPlatformData = async (req, res) => {
    try {
        const platformData = await PlatformData.find();
        // const platformData = await PlatformData.findById('654087611c008bf46106e5eb');
        console.log('Platform Data::',platformData);
        res.status(200).json(platformData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const UpdateSurveySettings = async (req, res) => {
    try {
        // get platform data from surveyPlans arrays objects
        let platformData = await PlatformData.findById('654087611c008bf46106e5eb');
        console.log('Platform Data::',platformData);

        // get survey plans array
        let surveyPlans = platformData.surveyPlans;
        console.log('Survey Plans::',surveyPlans);

        // get the updated survey plan and its index from the request body
        let updatedSurveyPlan = req.body.package;
        let index = req.body.index;

        // send updated data to database
        let updatedPlatformData = await PlatformData.findByIdAndUpdate(
            '654087611c008bf46106e5eb',
            { $set: { [`surveyPlans.${index}`]: updatedSurveyPlan } },
            {
              new: true, // Returns the updated document
              runValidators: true, // Run model's validation on update
            }
        );

        console.log('Updated Platform Data::',updatedPlatformData);
    }
    catch (error) {
        console.log(error);
    }
}

