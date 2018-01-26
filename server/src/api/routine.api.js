const routineModel = require("../model/routine.model");
const exerciseModel = require("../model/exercise.model");
const exerciseApi = require("./exercise.api");

const getLasUpdatedFromExercises = exercises => {
  let maxLastUpdated;
  const today = new Date();
  let updatedToday = 0;
  exercises.forEach(exerciseResult => {
    if (exerciseResult.lastUpdated) {
      if (!maxLastUpdated || exerciseResult.lastUpdated > maxLastUpdated) {
        maxLastUpdated = exerciseResult.lastUpdated;
      }
      const hours = (today.getTime() - exerciseResult.lastUpdated.getTime()) / 3600000
      if (hours < 24) {
        updatedToday += 1;
      }
    }
  });
  return { maxLastUpdated, updatedToday };
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
      const res = getLasUpdatedFromExercises(exercises);
      result.groupedExercises.push({
        muscleGroup: key,
        targets: exerciseApi.sortByTarget(exercises),
        lastUpdated: res.maxLastUpdated,
        doneToday: res.updatedToday
      });
    }
  }
};

const addLastUpdatedToRoutine = routineResult => {
  const routine = routineResult;
  const res = exerciseApi.addLastUpdatedToExercises(
    routineResult.exercises
  );
  routine.lastUpdated = res.maxLastUpdated;
  routine.doneToday = res.updatedToday;
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
    try {
      const routines = await getRoutine(req.params.id);
      res.send(routines);
    } catch (error) {
      res.status(500).json(error);
    }
  });
};

module.exports = { api, getLasUpdatedFromExercises };
