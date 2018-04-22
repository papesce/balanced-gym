// exercise-model.js - A mongoose model
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    muscleGroup: { type: String, required: true },
    // target: { type: String },
    target: { type: mongoose.Schema.Types.ObjectId, ref: "muscle" },
    series: [{ type: mongoose.Schema.Types.ObjectId, ref: "serie" }],
    gifURL: { type: String, required: true },
    exerciseURL: { type: String },
    synergists: [{ type: mongoose.Schema.Types.ObjectId, ref: "muscle" }],
    stabilizers: [{ type: mongoose.Schema.Types.ObjectId, ref: "muscle" }],
    equipment: { type: String },
    routineId: { type: mongoose.Schema.Types.ObjectId, ref: "routine" },
    links: [{ type: String }]
    // lastUpdated: Date  //last date of creation of the series
  },
  {
    timestamps: true,
    usePushEach: true
  }
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
  static async addExercisesToRoutine(routine) {
    const newRoutine = routine;
    const exercisesQuery = this.getModel().find({ routineId: routine._id }).populate({
      path: "series"
    });
    const exercisesResult = await exercisesQuery.lean().exec();
    newRoutine.exercises = exercisesResult;
    // addLastUpdatedToRoutine(newRoutine);
    // groupByMuscleGroup(newRoutine);
  }
}

module.exports = Exercise;
