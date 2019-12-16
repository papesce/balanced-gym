const exerciseModel = require("../model/exercise.model");
const exercisesApi = require("./exercises.api");

const getExercise = async exId => {
  const exQuery = exerciseModel
    .getModel()
    .findOne({ _id: exId })
    .select('name equipment')
    .populate("routineId", "name")
    .populate("muscleGroup", "name")
    .populate("target", "name muscleURL")
    .populate("synergists", "name")
    .populate("stabilizers", "name")
    .populate("series", 'name createdAt reps weight');
  const exResult = await exQuery.lean().exec();
  const exercisesQuery = exerciseModel.getModel().find({
    routineId: exResult.routineId,
    muscleGroup: exResult.muscleGroup,
    target: exResult.target
  }).select('name equipment')
    .populate("series", 'name createdAt reps weight')
    .populate("synergists", "name")
    .populate("stabilizers", "name");
  const exercisesResult = await exercisesQuery.lean().exec();
  exercisesApi.addLastUpdatedToExercise(exResult);
  exercisesApi.addSuggestedSerieToExercise(exResult, exercisesResult);
  return exResult;
  // return exercisesResult
};

const api = app => {
  app.get("/api/exercise/:id", async (req, res) => {
    try {
      const exercises = await getExercise(req.params.id);
      res.send(exercises);
    } catch (error) {
      console.log("Error handling /exercise/:id API", error);
      res.type('text/plain');
      res.status(500);
      res.send('Error handling /exercise/:id API');
    }
  });
};

module.exports = {
  api
};
