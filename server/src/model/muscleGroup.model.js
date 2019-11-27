// exercise-model.js - A mongoose model
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require("mongoose");

const muscleGroupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
    usePushEach: true
  }
);

const muscleGroupModel = mongoose.model("muscleGroup", muscleGroupSchema);

class MuscleGroup {
  // Create a simple mongoose model 'Note'
  static getModel() {
    return muscleGroupModel;
  }

  static getSchema() {
    return muscleGroupSchema;
  }
}

module.exports = MuscleGroup;