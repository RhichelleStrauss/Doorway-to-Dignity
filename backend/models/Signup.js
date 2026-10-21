const mongoose = require("mongoose");

const SignupSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    role: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// a volunteer can only sign up for the same event once
SignupSchema.index({ user: 1, event: 1 }, { unique: true });

module.exports = mongoose.models.Signup || mongoose.model("Signup", SignupSchema);
