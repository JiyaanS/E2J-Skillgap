const StudentProfile = require('../models/StudentProfile');
const InstituteStudent = require('../models/InstituteStudent');

// GET /profile/me
exports.getProfile = async (req, res) => {
  try {
    const email = req.userEmail;
    if (!email) return res.status(400).json({ message: 'Email not found in token' });
    const profile = await StudentProfile.findOne({ email });
    return res.json({ profile });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

// POST/PUT /profile
exports.createOrUpdateProfile = async (req, res) => {
  try {
    const email = req.userEmail;
    if (!email) return res.status(400).json({ message: 'Email not found in token' });
    const { isDraft, ...data } = req.body;
    const updateData = { ...data, email };
    if (!isDraft) {
      updateData.profileCompleted = true;
    }
    const profile = await StudentProfile.findOneAndUpdate(
      { email },
      updateData,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res.json({ profile });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to save profile' });
  }
};

// GET /profile/prefill
exports.prefillProfile = async (req, res) => {
  try {
    const email = req.userEmail;
    if (!email) return res.status(400).json({ message: 'Email not found in token' });
    const instStudent = await InstituteStudent.findOne({ email });
    if (!instStudent) return res.status(404).json({ message: 'Not found' });
    return res.json({
      firstName: instStudent.name?.split(' ')[0] || '',
      lastName: instStudent.name?.split(' ').slice(1).join(' ') || '',
      email: instStudent.email,
      mobilePrimary: instStudent.phone,
      presentAddress: instStudent.address ? { line1: instStudent.address } : {},
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to prefill profile' });
  }
};
