const exerciseModel = require("../model/exercise.model");
const exercisesApi = require("./exercises.api");
const serieModel = require("../model/serie.model");

const addLastCreateDateToExercise = async exercise => {
  const newExercise = exercise;
  const seriesQuery = serieModel.getModel().find().sort({
    createdAt: -1
  }).limit(1);
  const series = await seriesQuery.lean().exec();
  if (series.length === 1) {
    newExercise.lastCreationDate = series[0].createdAt;
  }
};

const getExercise = async exId => {
  const exQuery = exerciseModel
    .getModel()
    .findOne({ _id: exId })
    .select('name equipment gifURL')
    .populate("routineId", "name")
    .populate("muscleGroup", "name")
    .populate("target", "name muscleURL")
    .populate("synergists", "name muscleURL")
    .populate("stabilizers", "name muscleURL")
    // .populate("series", 'createdAt reps weight')
    .populate({
      path: 'series',
      select: 'createdAt reps weight restTime',
      options: { limit: 100, sort: { createdAt: -1 } }
    });
  const exResult = await exQuery.lean().exec();
  const exercisesQuery = exerciseModel.getModel().find({
    routineId: exResult.routineId,
    muscleGroup: exResult.muscleGroup,
    target: exResult.target
  }).select('name equipment')
    .populate('series', 'createdAt reps weight restTime')
    .populate("synergists", "name")
    .populate("stabilizers", "name");
  const exercisesResult = await exercisesQuery.lean().exec();
  exercisesApi.addLastUpdatedToExercise(exResult);
  exercisesApi.addSuggestedSerieToExercise(exResult, exercisesResult);
  await addLastCreateDateToExercise(exResult);
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
