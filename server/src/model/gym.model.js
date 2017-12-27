const routineModel = require("./routine.model");
const exerciseModel = require("./exercise.model");
const serieModel = require("./serie.model");

const computeExtraWeight = equip => {
  // if (equip === "Barbell Long") {
  //  return 6;
  // }
  switch (equip) {
    case "Dumbbells":
      return { extraWeight: 4, multiplier: 2 };
    case "Dumbbell":
      return { extraWeight: 2, multiplier: 1 };
    case "Barbell Long":
      return { extraWeight: 6, multiplier: 1 };
    case "Barbell Short":
      return { extraWeight: 1, multiplier: 1 };
    default:
      return { extraWeight: 0, multiplier: 1 };
  }
};

const denormalizeWeight = (weight, exercise) => {
  const { extraWeight, multiplier } = computeExtraWeight(exercise.equipment);
  const value = (weight - extraWeight) / multiplier;
  return (value > 0) ? value : 0;
};

const normalizeWeight = (weight, exercise) => {
  const { extraWeight, multiplier } = computeExtraWeight(exercise.equipment);
  return (weight * multiplier) + extraWeight;
};

const addLastUpdatedToExercises = exercises => {
  let maxLastUpdated;
  exercises.forEach(exerciseResult => {
    const exercise = exerciseResult;
    if (exerciseResult.series.length > 0) {
      exerciseResult.series.sort((s1, s2) => s1.createdAt < s2.createdAt);
      exercise.lastUpdated = exerciseResult.series[0].createdAt;
      // let newSeries = exerciseResult.series.map((serie) => {return {_id: serie._id}});
      // exerciseResult.seriesSize = newSeries.length;
      const bestSerie = exerciseResult.series[0];
      exercise.lastReps = bestSerie.reps;
      exercise.lastWeight = bestSerie.weight;
      exercise.normalizedWeight = normalizeWeight(bestSerie.weight, exercise);
      // exerciseResult.series = newSeries;
      if (!maxLastUpdated || maxLastUpdated < exercise.lastUpdated) {
        maxLastUpdated = exercise.lastUpdated;
      }
    } else {
      exercise.lastUpdated = exerciseResult.createdAt;
      exercise.lastReps = 0;
      exercise.lastWeight = 0;
      exercise.normalizedWeight = 0;
    }
  });
  return maxLastUpdated;
};

const addLastUpdatedToRoutine = routineResult => {
  const routine = routineResult;
  const maxLastUpdated = addLastUpdatedToExercises(routineResult.exercises);
  routine.lastUpdated = maxLastUpdated;
};

const compareExercises = (ex1, ex2) => {
  // return ex1.lastReps - ex2.lastReps;
  if (ex1.lastReps === 0) {
    return -1;
  }
  if (ex2.lastReps === 0) {
    return 1;
  }
  if (
    ex1.lastUpdated.toString().substring(0, 9) ===
    ex2.lastUpdated.toString().substring(0, 9)
  ) {
    return ex1.series.length > ex2.series.length;
  }
  return ex1.lastUpdated > ex2.lastUpdated;
};

const sortExercises = exercises => {
  exercises.sort(compareExercises);
  return exercises;
};

const computeSuggestedSerie = targetGroup => {
  let serie = {};
  const maxserie = { reps: 0, weight: 0 };
  targetGroup.forEach(ex => {
    if (ex.series.length > 0) {
      [serie] = ex.series;
      const nweight = normalizeWeight(serie.weight, ex);
      if (nweight > maxserie.weight) {
        maxserie.weight = nweight;
        maxserie.reps = serie.reps;
      }
    }
  });
  return maxserie;
};

const sortByTarget = exercises => {
  // group by target
  const targetGroups = {};
  const targets = [];
  // const result = routineResult;
  exercises.forEach(exercise => {
    const { target } = exercise;
    if (!targetGroups[target]) {
      targetGroups[target] = [];
    }
    targetGroups[target].push(exercise);
  });
  // add suggested serie to each exercise
  for (const key in targetGroups) {
    if (key) {
      const groupedExercises = targetGroups[key];
      const suggestedSerie = computeSuggestedSerie(groupedExercises);
      groupedExercises.forEach(ex => {
        const exerc = ex;
        if (suggestedSerie) {
          const denormalizedSerie = {
            reps: suggestedSerie.reps,
            weight: denormalizeWeight(suggestedSerie.weight, exerc)
          };
          exerc.suggestedSerie = denormalizedSerie;
        }
      });
      targets.push({
        target: key,
        exercises: sortExercises(groupedExercises)
      });
    }
  }
  // sort by target roup
  targets.sort((tg1, tg2) =>
    compareExercises(tg1.exercises[0], tg2.exercises[0])
  );
  // flatMap
  // let flatMap = [];
  // targets.forEach(tg => {
  //  const exs = tg.exercises;
  //  flatMap = flatMap.concat(exs);
  // });
  // return flatMap;
  return targets;
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
        targets: sortByTarget(newExercises[key])
      });
    }
  }
};

const addExercisesToRoutine = async (routine) => {
  const newRoutine = routine;
  const ExerciseModel = exerciseModel.getModel();
  const exercisesQuery = ExerciseModel.find({ routineId: routine._id }).populate({
    path: "series"
  });
  const exercisesResult = await exercisesQuery.lean().exec();
  newRoutine.exercises = exercisesResult;
  addLastUpdatedToRoutine(newRoutine);
  groupByMuscleGroup(newRoutine);
};

const getRoutines = async () => {
  const RoutineModel = routineModel.getModel();
  const routinesQuery = RoutineModel.find();
  const routines = await routinesQuery.lean().exec();
  for (let routineResult of routines) {
    await addExercisesToRoutine(routineResult);
  };
  return routines;
};

const getRoutine = async routineId => {
  const RoutineModel = routineModel.getModel();
  const routineQuery = RoutineModel.findOne({ _id: routineId });
  const routineResult = await routineQuery.lean().exec();
  await addExercisesToRoutine(routineResult);
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
  // if (!ex.target) ex.target = "to complete";
  // if (!ex.gifURL) ex.gifURL = "http://www.exrx.net/";
  await ex.save();
  return nSerie;
};

const getExercises = async query => {
  const ExerciseModel = exerciseModel.getModel();
  const exQuery = ExerciseModel.find(query).populate({
    path: "series"
  });
  exQuery.sort({ muscleGroup: 1, target: 1 });
  const exResult = await exQuery.lean().exec();
  addLastUpdatedToExercises(exResult);
  return sortByTarget(exResult);
};

const getExercise = async exId => {
  const ExerciseModel = exerciseModel.getModel();
  const exQuery = ExerciseModel.findOne({ _id: exId });
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

const getMuscleGroups = async () => {
  const ExerciseModel = exerciseModel.getModel();
  const exQuery = ExerciseModel.find();
  exQuery.distinct("muscleGroup");
  const exResult = await exQuery.lean().exec();
  return exResult.sort();
};

const getTargets = async () => {
  const ExerciseModel = exerciseModel.getModel();
  const exQuery = ExerciseModel.find();
  exQuery.distinct("target"); // , { muscleGroup: "Chest" });
  const exResult = await exQuery.lean().exec();
  return exResult.sort();
};

const getFilters = async () => {
  const ExerciseModel = exerciseModel.getModel();
  const exQuery = ExerciseModel.find();
  exQuery.distinct("target", { muscleGroup: "Chest" });
  const exResult = await exQuery.lean().exec();
  const result = {};
  result.muscleGroups = exResult.sort();
  const exQuery2 = ExerciseModel.find();
  exQuery2.distinct("muscleGroup", { target: "Sternal, Pectoralis Major" });
  const exResult2 = await exQuery2.lean().exec();
  result.targets = exResult2.sort();
  return result;
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
  newExercise,
  getMuscleGroups,
  getTargets,
  getFilters
};
