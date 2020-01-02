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
    // .populate("series", 'createdAt reps weight')
    .populate({
      path: 'series',
      select: 'createdAt reps weight',
      options: { limit: 6, sort: { createdAt: -1 } }
    });
  const exResult = await exQuery.lean().exec();
  const exercisesQuery = exerciseModel.getModel().find({
    routineId: exResult.routineId,
    muscleGroup: exResult.muscleGroup,
    target: exResult.target
  }).select('name equipment')
    .populate('series', 'createdAt reps weight')
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
      const exercise = await getExercise(req.params.id);
      res.send(exercise);
    } catch (error) {
      console.log("Error handling /exercise/:id API", error);
      res.type('text/plain');
      res.status(500);
      res.send('Error handling /exercise/:id API');
    }
  });
};

module.exports = {
  api,
  getExercise
};
