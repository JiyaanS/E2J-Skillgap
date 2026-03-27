const mongoose = require("mongoose");


const aspirationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    goal: {
      type: String,
      default: "",
    },
    aiAnalysisComplete: {
      type: Boolean,
      default: false,
    },
    aiResult: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Aspiration", aspirationSchema);
