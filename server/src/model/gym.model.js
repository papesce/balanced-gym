const routineModel = require("./routine.model");
require("./exercise.model");
require("./serie.model");

const addLastUpdated = routineResult => {
  const routine = routineResult;
  let maxLastUpdated;
  routineResult.exercises.forEach(exerciseResult => {
    const exercise = exerciseResult;
    if (exerciseResult.series.length > 0) {
      exerciseResult.series.sort((s1, s2) => s1.createdAt < s2.createdAt);
      exercise.lastUpdated = exerciseResult.series[0].createdAt;
      // let newSeries = exerciseResult.series.map((serie) => {return {_id: serie._id}});
      // exerciseResult.seriesSize = newSeries.length;
      exercise.lastReps = exerciseResult.series[0].reps;
      exercise.lastWeight = exerciseResult.series[0].weight;
      // exerciseResult.series = newSeries;
    } else {
      exercise.lastUpdated = exerciseResult.createdAt;
      exercise.lastReps = 0;
      exercise.lastWeight = 0;
    }
    if (!maxLastUpdated || maxLastUpdated < exercise.lastUpdated) {
      maxLastUpdated = exercise.lastUpdated;
    }
  });
  routine.lastUpdated = maxLastUpdated;
};

const groupByMuscleGroup = routineResult => {
  const newExercises = {};
  const result = routineResult;
  routineResult.exercises.forEach(exercise => {
    const { muscleGroup } = exercise;
    if (!newExercises[muscleGroup]) {
      newExercises[muscleGroup] = [];
    }
    newExercises[muscleGroup].push(exercise);
  });
  result.exercises = [];
  result.groupedExercises = [];
  for (const key in newExercises) {
    if (key) {
      result.groupedExercises.push({
        muscleGroup: key,
        exercises: newExercises[key]
      });
    }
  }
};

const getRoutines2 = async () => {
  const RoutineModel = routineModel.getModel();
  const routinesQuery = RoutineModel.find().populate({
    path: "exercises",
    populate: { path: "series" }
  });
  const routines = await routinesQuery.lean().exec();
  routines.forEach(routineResult => {
    addLastUpdated(routineResult);
    // sort exercises by muscleGroup
    // routineResult.exercises.sort(this.sortByMuscleGroup);
    groupByMuscleGroup(routineResult);
  });
  return routines;
};

module.exports = { getRoutines2 };
