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
      const hours = (today.getTime() - exerciseResult.lastUpdated.getTime()) / 3600000;
      if (hours < 24) {
        updatedToday += 1;
      }
    }
  });
  return { maxLastUpdated, updatedToday };
};

const groupByMuscleGroupExercisesOld = exercises => {
  const newExercises = {};
  exercises.forEach(exercise => {
    const { muscleGroup } = exercise;
    // TODO: group by muscle group ID
    const muscleGroupName = muscleGroup.name;
    if (!newExercises[muscleGroupName]) {
      newExercises[muscleGroupName] = [];
    }
    newExercises[muscleGroupName].push(exercise);
  });
  return newExercises;
};

const groupByMuscleGroup = routineResult => {
  //  const newExercises = {};
  const result = routineResult;
  const newExercises = groupByMuscleGroupExercisesOld(routineResult.exercises);
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
    .populate("muscleGroup")
    .populate("series")
    .populate("target")
    .populate("synergists")
    .populate("stabilizers");
  const exercisesResult = await exercisesQuery.lean().exec();
  newRoutine.exercises = exercisesResult;
  addLastUpdatedToRoutine(newRoutine);
  groupByMuscleGroup(newRoutine);
};

const getRoutines = async (withExercises) => {
  const routinesQuery = routineModel.getModel().find();
  const routines = await routinesQuery.lean().exec();
  const results = [];
  if (withExercises) {
    for (const routineResult of routines) {
      results.push(addExercisesToRoutine(routineResult));
    }
    await Promise.all(results);
  }
  return routines;
};

const api = app => {
  app.get("/routine", async (req, res) => {
    const routines = await getRoutines(true);
    res.send(routines);
  });

  const getRoutineSummary = async (routine) => {
    const newRoutine = routine;
    const exercisesQuery = exerciseModel.getModel()
      .find({ routineId: routine._id })
      .populate("series");
    const exercisesResult = await exercisesQuery.lean().exec();
    const targets = new Set();
    exercisesResult.forEach(item => targets.add(item.target.toString()));
    // console.log(targets);
    // const exercisesArray = routineResult.exercises;
    newRoutine.targetsCount = targets.size;
    newRoutine.exercisesCount = exercisesResult.length;
    newRoutine.exercises = exercisesResult;
    addLastUpdatedToRoutine(newRoutine);
    delete newRoutine.exercises;
    delete newRoutine.createdAt;
    delete newRoutine.updatedAt;
    return newRoutine;
  };

  app.get("/routines", async (req, res) => {
    const routines = await getRoutines(false);
    const results = [];
    for (const routineResult of routines) {
      const routine = getRoutineSummary(routineResult);
      results.push(routine);
    }
    const newRoutines = await Promise.all(results);
    res.send(newRoutines);
  });
};

module.exports = { api, getLasUpdatedFromExercises };
