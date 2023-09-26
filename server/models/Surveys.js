import mongoose from 'mongoose';


const surveySchema = new mongoose.Schema({
  surveyID: { type: String, required: true },
  surveyName: { type: String, required: true },
  surveyImage: { type: String, required: false },
  surveyDescription: { type: String, required: true },
  questions: {
    type: [mongoose.Schema.Types.Mixed],
    required: false,
  },
  created_date: { type: Date, default: Date.now },
  expiration_date: { type: Date, required: false },
  creatorID: { type: String, required: true },
  approvalStatus: { type: String, enum: ['draft', 'pending', 'approved', 'rejected'], default: 'draft' },
  approvedBy: { type: String },
  responses: { type: [mongoose.Schema.Types.Mixed], required: false },
  rejectionComment: { type: String },
  tags: [{ type: String }],
  comments: [{
    user: { type: String, required: false },
    text: { type: String, required: false }
  }]
},
  {
    timestamps: true,
    collection: 'Surveys'
  });

const Surveys = mongoose.model('Surveys', surveySchema);

export default Surveys;


