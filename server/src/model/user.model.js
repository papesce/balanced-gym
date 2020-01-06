const mongoose = require("mongoose");


/**
 * https://thinkster.io/tutorials/node-json-api/creating-the-user-model
 */
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }
  },
  {
    timestamps: true,
    usePushEach: true
  }
);

const userModel = mongoose.model("user", userSchema);

class User {
  // Create a simple mongoose model 'Note'
  static getModel() {
    return userModel;
  }

  static getSchema() {
    return userSchema;
  }
}

module.exports = User;
