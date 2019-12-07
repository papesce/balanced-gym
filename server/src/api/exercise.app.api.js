const exerciseModel = require("../model/exercise.model");
const exerciseApi = require("./exercise.api");
const muscleApi = require("./muscle.api");
const routineApi = require("./routine.app.api");
const muscleGroupApi = require("./muscleGroup.app.api");
const utils = require("./utils");

const getExercises = (exercisesResult) => {
  // const { maxLastUpdated, updatedToday } =
  exerciseApi.addLastUpdatedToExercises(exercisesResult);
  exerciseApi.addSuggestedSerieToExercise(exercisesResult);
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
  const muscleResult = await muscleApi.getMuscle(targetId);
  const routineResult = await routineApi.getRoutine(routineId);
  const muscleGroupResult = await muscleGroupApi.getMuscleGroup(muscleGroupId);
  const ExerciseModel = exerciseModel.getModel();
  const exercisesQuery =
    ExerciseModel.find({
      routineId,
      muscleGroup: muscleGroupId,
      target: targetId
    }).select('name target gifURL')
      .populate("series");
  const exercisesResult = await exercisesQuery.lean().exec();
  const exercises = getExercises(exercisesResult);
  utils.sortByLastUpdated(exercises);
  const newTarget = {
    _id: targetId,
    name: muscleResult.name,
    routineId,
    routineName: routineResult.name,
    muscleGroupId,
    muscleGroupName: muscleGroupResult.name,
    exercises,
    // lastUpdated: maxLastUpdated,
    // doneToday: updatedToday
  };
  return newTarget;
};

const api = app => {
  app.get("/api/routine/:routineId/muscleGroup/:muscleGroupId/target/:targetId", async (req, res) => {
    const { routineId, muscleGroupId, targetId } = req.params;
    const target = await getTarget(routineId, muscleGroupId, targetId);
    res.send(target);
  });
};

module.exports = {
  api
};