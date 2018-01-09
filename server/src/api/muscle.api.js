const exerciseModel = require("../model/exercise.model");
const muscleModel = require("../model/muscle.model");

const getTargets = async () => {
  const ExerciseModel = exerciseModel.getModel();
  const exQuery = ExerciseModel.find();
  exQuery.distinct("target"); // , { muscleGroup: "Chest" });
  const exResult = await exQuery.lean().exec();
  return exResult.sort();
};
const getTargets2 = async () => {
  const exQuery = muscleModel.getModel().find();
  // exQuery.distinct("target"); // , { muscleGroup: "Chest" });
  const exResult = await exQuery.lean().exec();
  return exResult.sort();
};
const api = app => {
  app.get("/target", async (req, res) => {
    const targets = await getTargets();
    res.send(targets);
  });
  app.get("/target2", async (req, res) => {
    const targets = await getTargets2();
    res.send(targets);
  });
};

module.exports = { api };
