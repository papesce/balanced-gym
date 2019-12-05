const exerciseModel = require("../model/exercise.model");
const exerciseApi = require("./exercise.api");
const utils = require("./utils");


const addAll = (set, array) => {
  if (array) {
    array.forEach(item => set.add(item.toString()));
  }
};

// TODO: In the future this can be avoided with a many2many relationship between
// ecercise and muscleGrup
const groupByTargetExercises = exercises => {
  const targetsById = {};
  exercises.forEach(exercise => {
    const { target } = exercise;
    // TODO: group by muscle group ID
    const targetId = target._id;
    if (!targetsById[targetId]) {
      targetsById[targetId] = {
        ...target,
        exercises: [],
        synergists: new Set(),
        stabilizers: new Set()
      };
    }
    const t = targetsById[targetId];
    t.exercises.push(exercise);
    addAll(t.stabilizers, exercise.stabilizers);
    addAll(t.synergists, exercise.synergists);
  });
  return targetsById;
};

const groupExercisesByTarget = exercisesResult => {
  const targets = [];
  // const groupedExercisesById = exercisesResult; // []; // routineResult;
  const targetsById = groupByTargetExercises(exercisesResult);
  for (const targetId in targetsById) {
    if (targetId) {
      const target = targetsById[targetId];
      const { exercises, synergists, stabilizers } = target;
      const { maxLastUpdated, updatedToday } =
           exerciseApi.addLastUpdatedToExercises(exercises);
      const newTarget = {
        ...target,
        //       // targets: exerciseApi.sortByTarget(exercises),
        exercisesCount: exercises.length,
        lastUpdated: maxLastUpdated,
        doneToday: updatedToday,
        synergistsCount: synergists.size,
        stabilizersCount: stabilizers.size
      };
      delete newTarget.exercises;
      delete newTarget.synergists;
      delete newTarget.stabilizers;
      targets.push(newTarget);
    }
  }
  return targets;
};

const getMuscleGroup = async (routineId, muscleGroupId) => {
  const ExerciseModel = exerciseModel.getModel();
  const exercisesQuery = ExerciseModel.find({
    routineId,
    muscleGroup: muscleGroupId
  }).select('name target synergists stabilizers')
    // .populate("muscleGroup")
    .populate("series")
    .populate("target", "name muscleURL");
    // .populate("synergists")
    // .populate("stabilizers");
  const exercisesResult = await exercisesQuery.lean().exec();
  const targets = groupExercisesByTarget(exercisesResult);
  utils.sortTargets(targets);
  const muscleGroup = {
    // tempResult: exercisesResult,
    targets
  };
  return muscleGroup;
};

const api = app => {
  app.get("/routine/:routineId/muscleGroup/:muscleGroupId", async (req, res) => {
    const muscleGroup = await getMuscleGroup(req.params.routineId, req.params.muscleGroupId);
    res.send(muscleGroup);
  });
};


module.exports = { api };
