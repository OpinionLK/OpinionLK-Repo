
import mongoose from 'mongoose';


const surveySchema = new mongoose.Schema({
  surveyName: { type: String, required: true },
  surveyDescription: { type: String, required: true },
  questions: [{ type: String, required: true }],
  created_date: { type: Date, default: Date.now },
  expiration_date: { type: Date, required: true },
  creatorID: { type: String, required: true },
  approvalStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  approvedBy: { type: String },
  responses: [{
    user: { type: String, required: true },
    answers: [{ type: String, required: true }]
  }],
  rejectionComment: { type: String },
  tags: [{ type: String }],
  comments: [{
    user: { type: String, required: true },
    text: { type: String, required: true }
  }]
},
    {
        timestamps: true,
        collection: 'Surveys' // Specify your collection name here
    }
);

const Surveys = mongoose.model('Survey', surveySchema);

export default Surveys;
