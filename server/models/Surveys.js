import mongoose from 'mongoose';


const surveySchema = new mongoose.Schema({
  surveyID: { type: String, required: true },
  surveyName: { type: String, required: true },
  surveyImage: { type: String, required: true, default: 'default_bg' },
  surveyDescription: { type: String, required: true },
  questionCount: { type: Number, required: false },
  questions: {
    type: [mongoose.Schema.Types.Mixed],
    required: false,
  },
  created_date: { type: Date, default: Date.now },
  expiration_date: { type: Date, required: false },
  creatorID: { type: String, required: true },
  approvalStatus: { type: String, enum: ['draft', 'pending', 'approved', 'rejected', 'active', 'paused'], default: 'draft' },
  approvedBy: { type: String },
  responses: { type: [mongoose.Schema.Types.Mixed], required: false },
  rejectionComment: { type: String },
  endCriteria: { type: String },
  duration: { type: Number },
  targetResponses: { type: Number },
  estimatedCost: { type: Number },
  userTags: { type: [mongoose.Schema.Types.Mixed], required: false },
  tags: [{ type: String }],
  comments: [{
    commentID: { type: String },
    comment: { type: String },
    managerID: { type: String },
    created_date: { type: Date, default: Date.now },
  }],
  points: {
    type: Number,
    default: 0
  },
},
  {
    timestamps: true,
    collection: 'Surveys'
  });

const Surveys = mongoose.model('Surveys', surveySchema);

export default Surveys;


