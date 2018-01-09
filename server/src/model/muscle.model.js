const mongoose = require("mongoose");

const muscleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    muscleURL: { type: String },
  },
  {
    timestamps: true,
    usePushEach: true
  }
);

const muscleModel = mongoose.model("muscle", muscleSchema);

class Muscle {
  // Create a simple mongoose model 'Note'
  static getModel() {
    return muscleModel;
  }

  static getSchema() {
    return muscleSchema;
  }
}

module.exports = Muscle;
