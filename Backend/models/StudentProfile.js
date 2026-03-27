const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  degree: String,
  college: String,
  specialization: String,
  yearOfPassing: String,
  currentlyPursuing: Boolean,
  percentage: String,
}, { _id: false });

const workSchema = new mongoose.Schema({
  company: String,
  location: String,
  employmentType: String,
  startDate: String,
  endDate: String,
  currentlyWorking: Boolean,
}, { _id: false });

const resumeSchema = new mongoose.Schema({
  url: String,
  name: String,
  isPrimary: Boolean,
}, { _id: false });

const addressSchema = new mongoose.Schema({
  line1: String,
  line2: String,
  city: String,
  state: String,
  country: String,
  pincode: String,
}, { _id: false });

const studentProfileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  resumes: [resumeSchema],
  profilePhoto: String,
  title: String,
  firstName: String,
  middleName: String,
  lastName: String,
  dob: String,
  gender: String,
  nationality: String,
  maritalStatus: String,
  physicallyChallenged: String,
  bloodGroup: String,
  mobilePrimary: String,
  mobileAlternate: String,
  presentAddress: addressSchema,
  permanentAddress: addressSchema,
  education: [educationSchema],
  work: [workSchema],
  skills: [String],
  profileCompleted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
