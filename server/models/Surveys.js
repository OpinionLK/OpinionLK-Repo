import mongoose from 'mongoose';

const moodOptionSchema = new mongoose.Schema({
  option: { type: String, required: true },
  emoji: { type: String, required: true },
});
const OptionSchema = new mongoose.Schema({
  option: { type: String, required: true },
});

const MoodSchema = new mongoose.Schema({
  responseType: {
    type: String,
    required: true,
  },
  items: {
    type: [moodOptionSchema],
    required: true,
    validate: [array => array.length >= 2, '{PATH} must have at least 2 items.'],
  },
  question: { type: String, required: true },
});
const ChoiceSchema = new mongoose.Schema({
  responseType: {
    type: String,
    required: true,
  },
  items: {
    type: [OptionSchema],
    required: true,
    validate: [array => array.length >= 2, '{PATH} must have at least 2 items.'],
  },
  question: { type: String, required: true },
});

const TextSchema = new mongoose.Schema({
  questionID: { type: String, required: true },
  responseType: { type: String, required: true },
  question: { type: String, required: true },
  textPlaceholder: { type: String, required: false },

});


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

export const Surveys = mongoose.model('Survey', surveySchema);
export const Mood = mongoose.model('Mood', MoodSchema);
export const Choice = mongoose.model('Choice', ChoiceSchema);
export const Text = mongoose.model('Text', TextSchema);


