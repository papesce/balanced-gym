const routineModel = require("./routine.model");
const exerciseModel = require("./exercise.model");
const serieModel = require("./serie.model");

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

const getRoutines = async () => {
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

const getRoutine = async routineId => {
  // bug fix case of routine not found
  const RoutineModel = routineModel.getModel();
  const routineQuery = RoutineModel.findOne({ _id: routineId }).populate({
    path: "exercises",
    populate: { path: "series" }
  });
  const routineResult = await routineQuery.lean().exec();
  addLastUpdated(routineResult);
  groupByMuscleGroup(routineResult);
  // sort exercises by muscleGroup
  // routineResult.exercises.sort(this.sortByMuscleGroup);
  return routineResult;
};

const newSerie = async exerciseId => {
  const SerieModel = serieModel.getModel();
  const nSerie = await new SerieModel({ reps: 10, weight: 1 }).save();
  const ExerciseModel = exerciseModel.getModel();
  const ex = await ExerciseModel.findById(exerciseId).exec();
  ex.series.push(nSerie);
  ex.lastUpdated = nSerie.createdAt;
  // temporary hack"
  if (!ex.target) ex.target = "to complete";
  if (!ex.gifURL) ex.gifURL = "http://www.exrx.net/";
  await ex.save();
  return nSerie;
};

const getExercises = async () => {
  const ExerciseModel = exerciseModel.getModel();
  const exQuery = ExerciseModel.find();
  exQuery.select({
    name: 1,
    muscleGroup: 1,
    target: 1,
    gifURL: 1
  }).sort({ muscleGroup: 1, target : 1 });
  const exResult = await exQuery.lean().exec();
  return exResult;
};

const getExercise = async (exId) => {
  const ExerciseModel = exerciseModel.getModel();
  const exQuery = ExerciseModel.findOne({ _id: exId });
  exQuery.select({
    name: 1,
    muscleGroup: 1,
    target: 1,
    gifURL: 1
  });
  const exResult = await exQuery.lean().exec();
  return exResult;
};

const updateExercise = async (exId, exUpdate) => {
  // in the future see node-mongoose-es7 starter book
  const ExerciseModel = exerciseModel.getModel();
  const exQuery = ExerciseModel.findOneAndUpdate({ _id: exId }, exUpdate, {
    new: true
  });
  const exResult = await exQuery.lean().exec();
  return exResult;
};

const updateSerie = async (serieId, serieUpdate) => {
  // in the future see node-mongoose-es7 starter book
  const SerieModel = serieModel.getModel();
  const serieQuery = SerieModel.findOneAndUpdate(
    { _id: serieId },
    serieUpdate,
    { new: true }
  );
  const serieResult = await serieQuery.lean().exec();
  return serieResult;
};

const deleteSerie = async serieId => {
  const SerieModel = serieModel.getModel();
  const serieQuery = SerieModel.findOneAndRemove({ _id: serieId });
  const serieResult = await serieQuery.lean().exec();
  return serieResult;
};

const getRoutineById = async routineId => {
  const RoutineModel = routineModel.getModel();
  const routine = await RoutineModel.findOne({ _id: routineId });
  return routine;
};

// const getRoutineByName = async routineId => {
//   const RoutineModel = routineModel.getModel();
//   const routine = await RoutineModel.findOne({ name: routineId });
//   return routine;
// };

const newExercise = async (routineId, exercise) => {
  const routine = await getRoutineById(routineId);
  const ExerciseModel = exerciseModel.getModel();
  const exe = await new ExerciseModel({
    name: exercise.name,
    series: [],
    muscleGroup: exercise.muscleGroup,
    target: exercise.target,
    gifURL: exercise.gifURL
  }).save();
  routine.exercises.push(exe._id);
  await routine.save();
};

module.exports = {
  getRoutines,
  getRoutine,
  getExercises,
  getExercise,
  updateExercise,
  deleteSerie,
  updateSerie,
  newSerie,
  newExercise
};
