const exerciseModel = require("../model/exercise.model");
const muscleModel = require("../model/muscle.model");

const getTargets = async () => {
  const ExerciseModel = exerciseModel.getModel();
  const exQuery = ExerciseModel.find();
  exQuery.distinct("target"); // , { muscleGroup: "Chest" });
  const exResult = await exQuery.lean().exec();
  return exResult.sort();
};
const getMuscles = async () => {
  const exQuery = muscleModel.getModel().find();
  // exQuery.distinct("target"); // , { muscleGroup: "Chest" });
  const exResult = await exQuery.lean().exec();
  return exResult.sort();
};

const newMuscle = async (muscle) => {
  const MuscleModel = muscleModel.getModel();
  await new MuscleModel(muscle).save();
};

const api = app => {
  app.get("/target", async (req, res) => {
    const targets = await getTargets();
    res.send(targets);
  });
  app.get("/muscle", async (req, res) => {
    const targets = await getMuscles();
    res.send(targets);
  });
  app.post("/newMuscle", async (req, res) => {
    const muscle = await newMuscle(req.body);
    res.send(muscle);
  });
};

module.exports = { api };
