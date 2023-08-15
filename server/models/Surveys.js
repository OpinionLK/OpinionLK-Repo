import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionID: { type: String, required: true },

  type: { type: String, enum: ['text', 'radio', 'mood', 'dropdown', 'checkbox'], required: true },
  questionText: { type: String, required: true },
  placeholder: { type: String, required: false },
  options: [{ type: String, required: false }]
});

const surveySchema = new mongoose.Schema({
  surveyID: { type: String, required: true },
  surveyName: { type: String, required: true },
  surveyDescription: { type: String, required: true },
  questions: [questionSchema], // Now an array of question objects
  created_date: { type: Date, default: Date.now },
  expiration_date: { type: Date, required: false },
  creatorID: { type: String, required: true },
  approvalStatus: { type: String, enum: ['draft', 'pending', 'approved', 'rejected'], default: 'draft' },
  approvedBy: { type: String },
  responses: [{
    user: { type: String, required: false },
    answers: [{ type: String, required: false }]
  }],
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

const Surveys = mongoose.model('Survey', surveySchema);

export default Surveys;
