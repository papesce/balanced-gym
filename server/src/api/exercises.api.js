
const exerciseModel = require("../model/exercise.model");

const computeExtraWeight = equip => {
  switch (equip) {
    case "Dumbbells":
      return { extraWeight: 3.6, multiplier: 2 };
    case "Dumbbell":
      return { extraWeight: 1.8, multiplier: 1 };
    case "Barbell Long":
      return { extraWeight: 7.8, multiplier: 1 };
    case "Barbell Short":
      return { extraWeight: 1.3, multiplier: 1 };
    default:
      return { extraWeight: 0, multiplier: 1 };
  }
};

const denormalizeWeight = (weight, exercise) => {
  const { extraWeight, multiplier } = computeExtraWeight(exercise.equipment);
  const value = (weight - extraWeight) / multiplier;
  return value > 0 ? value : 0;
};

const normalizeWeight = (weight, exercise) => {
  const { extraWeight, multiplier } = computeExtraWeight(exercise.equipment);
  return (weight * multiplier) + extraWeight;
};

const areSimilar = (musc1s, musc2s) => {
  const s1 = new Set(musc1s.map(m => m.name));
  const s2 = new Set(musc2s.map(m => m.name));
  const difference1 = new Set([...s1].filter(x => !s2.has(x)));
  const difference2 = new Set([...s2].filter(x => !s1.has(x)));

  return difference1.size === 0 && difference2.size === 0;
};

const isSimilar = (ex1, ex2) => {
  if (!ex1.synergists && ex2.synergists) return false;
  if (!ex2.synergists && ex1.synergists) return false;
  if (!ex1.synergists && !ex2.synergists) return true;
  return areSimilar(ex1.synergists, ex2.synergists);
};

const computeSuggestedSerie = (exercise, targetGroup) => {
  let serie = {};
  const maxserie = { reps: 0, weight: -1 };
  targetGroup.forEach(ex => {
    // console.log('eq:', ex.equipment);
    if (isSimilar(exercise, ex) && ex.series.length > 0) {
      ex.series.sort((s1, s2) => s1.createdAt < s2.createdAt);
      [serie] = ex.series;
      if (exercise.equipment !== "TRX" || ex.equipment === "TRX") {
        const nweight = normalizeWeight(serie.weight, ex);
        console.log('nweight', nweight);
        if (nweight > maxserie.weight) {
          maxserie.weight = nweight;
          maxserie.reps = serie.reps;
        }
      }
    }
  });
  if (maxserie.weight === -1) {
    maxserie.weight = 0;
  }
  return maxserie;
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

const addSuggestedSerieToExercise = (exercise, exercises) => {
  const suggestedSerie = computeSuggestedSerie(exercise, exercises);
  const exerc = exercise;
  if (suggestedSerie) {
    const denormalizedSerie = {
      reps: suggestedSerie.reps,
      weight: denormalizeWeight(suggestedSerie.weight, exerc)
    };
    exerc.suggestedSerie = denormalizedSerie;
  }
};

const addSuggestedSerieToExercises = (exercises) => {
  exercises.forEach(ex => {
    addSuggestedSerieToExercise(ex, exercises);
  });
};

const sortByTarget = exercises => {
  // group by target
  const targetGroups = {};
  const targetObjs = {};
  const targets = [];
  // const result = routineResult;
  exercises.forEach(exercise => {
    const { target } = exercise;
    // if (typeof target === "string") {
    if (!targetGroups[target._id]) {
      targetGroups[target._id] = [];
      targetObjs[target._id] = target;
    }
    targetGroups[target._id].push(exercise);
    // }
  });

  // add suggested serie to each exercise
  for (const key in targetGroups) {
    if (key) {
      const groupedExercises = targetGroups[key];
      addSuggestedSerieToExercises(groupedExercises);
      targets.push({
        target: targetObjs[key],
        exercises: sortExercises(groupedExercises)
        // lastUpdated: addLastUpdatedToExercises(groupedExercises);
        // routine.lastUpdated = maxLastUpdated;
      });
    }
  }
  // sort by target roup
  targets.sort((tg1, tg2) =>
    compareExercises(tg1.exercises[0], tg2.exercises[0])
  );
  return targets;
};

const addLastUpdatedToExercise = (exerciseResult) => {
  const exercise = exerciseResult;
  if (exercise.series.length > 0) {
    exercise.series.sort((s1, s2) => s1.createdAt < s2.createdAt);
    exercise.lastUpdated = exercise.series[0].createdAt;
    const bestSerie = exercise.series[0];
    exercise.lastReps = bestSerie.reps;
    exercise.lastWeight = bestSerie.weight;
    exercise.normalizedWeight = normalizeWeight(bestSerie.weight, exercise);
  } else {
    exercise.lastReps = 0;
    exercise.lastWeight = 0;
    exercise.normalizedWeight = 0;
  }
};

const addLastUpdatedToExercises = exercises => {
  let maxLastUpdated;
  const today = new Date();
  let updatedToday = 0;
  exercises.forEach(exerciseResult => {
    const exercise = exerciseResult;
    addLastUpdatedToExercise(exercise);
    if (exercise.lastUpdated) {
      if (!maxLastUpdated || maxLastUpdated < exercise.lastUpdated) {
        maxLastUpdated = exercise.lastUpdated;
      };
      const hours = (today.getTime() - exercise.lastUpdated.getTime()) / 3600000;
      if (hours < 24) {
        updatedToday += 1;
      }
    }
  });
  return { maxLastUpdated, updatedToday };
};

const getExercises = async query => {
  const exQuery = exerciseModel
    .getModel()
    .find(query)
    .populate("routineId", "name")
    .populate("muscleGroup", "name")
    .populate("series")
    .populate("target", "name")
    .populate("synergists", "name")
    .populate("stabilizers", "name");
  exQuery.sort({ muscleGroup: 1, target: 1 });
  const exResult = await exQuery.lean().exec();
  addLastUpdatedToExercises(exResult);
  // const exr2 = exResult.filter(e => e.gifURL && !e.gifURL.startsWith("/"));
  // return sortByTarget(exr2);
  return sortByTarget(exResult);
};

const updateExercise = async (exId, exUpdate) => {
  const exQuery = exerciseModel
    .getModel()
    .findOneAndUpdate({ _id: exId }, exUpdate, {
      new: true
    });
  const exResult = await exQuery.lean().exec();
  return exResult;
};

const newExercise = async (routineId, exercise) => {
  // const routine = await getRoutineById(routineId);
  const ExerciseModel = exerciseModel.getModel();
  await new ExerciseModel({
    name: exercise.name,
    series: [],
    muscleGroup: exercise.muscleGroup,
    target: exercise.target,
    gifURL: exercise.gifURL,
    equipment: exercise.equipment,
    exerciseURL: exercise.exerciseURL,
    synergists: exercise.synergists,
    stabilizers: exercise.stabilizers,
    routineId: exercise.routineId
  }).save();
};

const api = app => {
  app.get("/api/exercises", async (req, res) => {
    try {
      const exercises = await getExercises(req.query);
      res.send(exercises);
    } catch (error) {
      console.log("Error handling /exercise API:", error);
      res.status(500).send("inernal server error");
    }
  });

  app.patch("/api/exercise/:id", async (req, res) => {
    const updatedExercise = await updateExercise(req.params.id, req.body);
    res.send(updatedExercise);
  });

  app.post("/api/newExercise/:routineId", async (req, res) => {
    const exercise = await newExercise(req.params.routineId, req.body);
    res.send(exercise);
  });
};

module.exports = {
  api,
  addLastUpdatedToExercises,
  addLastUpdatedToExercise,
  addSuggestedSerieToExercise,
  addSuggestedSerieToExercises,
  updateExercise,
  sortByTarget
};
