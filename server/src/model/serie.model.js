// exercise-model.js - A mongoose model
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require("mongoose");

const serieSchema = new mongoose.Schema(
  {
    reps: Number,
    weight: Number
  },
  { timestamps: true }
);

const serieModel = mongoose.model("serie", serieSchema);

class Serie {
  // Create a simple mongoose model 'Note'
  static getModel() {
    return serieModel;
  }

  static getSchema() {
    return serieSchema;
  }
}

module.exports = Serie;