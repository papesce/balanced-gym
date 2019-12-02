const exerciseModel = require("../model/exercise.model");
const exerciseApi = require("./exercise.api");


const getExercises = (exercisesResult) => {
  // const { maxLastUpdated, updatedToday } =
  exerciseApi.addLastUpdatedToExercises(exercisesResult);
  return exercisesResult.map(exercise => {
    const newExercise = {
      ...exercise,
      seriesCount: exercise.series.length
    };

    delete newExercise.series;
    delete newExercise.target;
    return newExercise;
  });
};


const getTarget = async (routineId, muscleGroupId, targetId) => {
  const ExerciseModel = exerciseModel.getModel();
  const exercisesQuery = ExerciseModel.find({ routineId, muscleGroup: muscleGroupId, target: targetId }).select('name target')
    .populate("series");
  const exercisesResult = await exercisesQuery.lean().exec();
  const exercises = getExercises(exercisesResult);
  const newTarget = {
    _id: targetId,
    exercises,
    // lastUpdated: maxLastUpdated,
    // doneToday: updatedToday
  };
  return newTarget;
};

const api = app => {
  app.get("/routine/:routineId/muscleGroup/:muscleGroupId/target/:targetId", async (req, res) => {
    const { routineId, muscleGroupId, targetId } = req.params;
    const target = await getTarget(routineId, muscleGroupId, targetId);
    res.send(target);
  });
};

module.exports = {
  api
};
