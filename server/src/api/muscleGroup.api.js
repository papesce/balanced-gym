const exerciseModel = require("../model/exercise.model");
const exerciseApi = require("./exercise.api");
const routineApi = require("./routine.api");

const getMuscleGroup = async query => {
  const ExerciseModel = exerciseModel.getModel();
  const exercisesQuery = ExerciseModel.find(query)
    .populate("series")
    .populate("target")
    .populate("synergists");
  const exercisesResult = await exercisesQuery.lean().exec();
  const res = exerciseApi.addLastUpdatedToExercises(exercisesResult);
  const muscleGroup = {
    muscleGroup: query.muscleGroup,
    targets: exerciseApi.sortByTarget(exercisesResult),
    lastUpdated: routineApi.getLasUpdatedFromExercises(exercisesResult),
    doneToday: res.updatedToday
  };
  return muscleGroup;
};

const getMuscleGroups = async () => {
  const ExerciseModel = exerciseModel.getModel();
  const exQuery = ExerciseModel.find();
  exQuery.distinct("muscleGroup");
  const exResult = await exQuery.lean().exec();
  return exResult.sort();
};

const api = app => {
  app.get("/muscleGroup", async (req, res) => {
    const muscleGroup = await getMuscleGroup(req.query);
    res.send(muscleGroup);
  });
  app.get("/muscleGroups", async (req, res) => {
    const muscleGroups = await getMuscleGroups();
    res.send(muscleGroups);
  });
};

module.exports = { api };
