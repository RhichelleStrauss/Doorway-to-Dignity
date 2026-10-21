const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    image: { type: String },
    location: { type: String, required: true, trim: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
      roles: {
      type: [
        {
          name: { type: String, required: true, trim: true },
          capacity: { type: Number, required: true, min: 1 },
        },
      ],
      validate: [(roles) => roles.length > 0, "An event needs at least one role."],
    },

  },
  { timestamps: true }
);

module.exports = mongoose.models.Event || mongoose.model("Event", EventSchema);
