const routineModel = require("../model/routine.model");
const exerciseModel = require("../model/exercise.model");
const exerciseApi = require("./exercise.api");

const getLasUpdatedFromExercises = exercises => {
  let maxLastUpdated;
  exercises.forEach(exerciseResult => {
    if (!maxLastUpdated || exerciseResult.lastUpdated > maxLastUpdated) {
      maxLastUpdated = exerciseResult.lastUpdated;
    }
  });
  return maxLastUpdated;
};

const groupByMuscleGroupExercises = exercises => {
  const newExercises = {};
  exercises.forEach(exercise => {
    const { muscleGroup } = exercise;
    if (!newExercises[muscleGroup]) {
      newExercises[muscleGroup] = [];
    }
    newExercises[muscleGroup].push(exercise);
  });
  return newExercises;
};

const groupByMuscleGroup = routineResult => {
  //  const newExercises = {};
  const result = routineResult;
  const newExercises = groupByMuscleGroupExercises(routineResult.exercises);
  // result.exercises = [];
  result.groupedExercises = [];
  for (const key in newExercises) {
    if (key) {
      const exercises = newExercises[key];
      result.groupedExercises.push({
        muscleGroup: key,
        targets: exerciseApi.sortByTarget(exercises),
        lastUpdated: getLasUpdatedFromExercises(exercises)
      });
    }
  }
};

const addLastUpdatedToRoutine = routineResult => {
  const routine = routineResult;
  const maxLastUpdated = exerciseApi.addLastUpdatedToExercises(
    routineResult.exercises
  );
  routine.lastUpdated = maxLastUpdated;
};

const addExercisesToRoutine = async routine => {
  const newRoutine = routine;
  const exercisesQuery = exerciseModel
    .getModel()
    .find({ routineId: routine._id })
    .populate("series")
    .populate("target")
    .populate("synergists");
  const exercisesResult = await exercisesQuery.lean().exec();
  newRoutine.exercises = exercisesResult;
  addLastUpdatedToRoutine(newRoutine);
  groupByMuscleGroup(newRoutine);
};

const getRoutines = async () => {
  const routinesQuery = routineModel.getModel().find();
  const routines = await routinesQuery.lean().exec();
  const results = [];
  for (const routineResult of routines) {
    results.push(addExercisesToRoutine(routineResult));
  }
  await Promise.all(results);
  return routines;
};

const getRoutine = async routineId => {
  const routineQuery = routineModel.getModel().findOne({ _id: routineId });
  const routineResult = await routineQuery.lean().exec();
  await addExercisesToRoutine(routineResult);
  return routineResult;
};

const api = app => {
  app.get("/routine", async (req, res) => {
    const routines = await getRoutines();
    res.send(routines);
  });

  app.get("/routine/:id", async (req, res) => {
    const routines = await getRoutine(req.params.id);
    res.send(routines);
  });
};

module.exports = { api, getLasUpdatedFromExercises };
