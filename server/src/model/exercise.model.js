// exercise-model.js - A mongoose model
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    muscleGroup: { type: String, required: true },
    target: { type: String, required: true },
    series: [{ type: mongoose.Schema.Types.ObjectId, ref: "serie" }],
    gifURL: { type: String, required: true },
    multiplier: { type: Number, required: true },
    equipment: { type: String, required: true }
    // lastUpdated: Date  //last date of creation of the series
  },
  { timestamps: true }
);

const exerciseModel = mongoose.model("exercise", exerciseSchema);

class Exercise {
  // Create a simple mongoose model 'Note'
  static getModel() {
    return exerciseModel;
  }

  static getSchema() {
    return exerciseSchema;
  }
}

module.exports = Exercise;
