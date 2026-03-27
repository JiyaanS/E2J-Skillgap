const Aspiration = require("../models/Aspiration");

// GET /aspirations/me
exports.getUserAspirations = async (req, res) => {
  try {
    const userId = req.userId;

    const aspirations = await Aspiration.findOne({ userId });

    return res.json({ aspirations });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch aspirations" });
  }
};

// POST /aspirations
exports.createAspirations = async (req, res) => {
  try {
    console.log('aspirations.createAspirations req.body:', req.body);
    const userId = req.userId;
    const { goal } = req.body;

    const aspirations = await Aspiration.findOneAndUpdate(
      { userId },
      {
        userId,
        goal,
        aiAnalysisComplete: true,
        updatedAt: Date.now(),
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({ aspirations });
  } catch (error) {
    console.error('aspirations.createAspirations error:', error);
    return res.status(500).json({ message: `Failed to create or update aspirations: ${error.message || error}` });
  }
};
