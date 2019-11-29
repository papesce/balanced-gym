const routineModel = require("../model/routine.model");
const exerciseModel = require("../model/exercise.model");
// const routinesApi = require("./routines.api");
const exercisesApi = require("./exercise.api");


// TODO: In the future this can be avoided with a many2many relationship between
// ecercise and muscleGrup
const groupByMuscleGroupExercises = exercises => {
  const muscleGroupsById = {};
  exercises.forEach(exercise => {
    const { muscleGroup, target } = exercise;
    // TODO: group by muscle group ID
    const muscleGroupId = muscleGroup._id;
    if (!muscleGroupsById[muscleGroupId]) {
      muscleGroupsById[muscleGroupId] = { ...muscleGroup, exercises: [], targets: new Set() };
    }
    muscleGroupsById[muscleGroupId].exercises.push(exercise);
    muscleGroupsById[muscleGroupId].targets.add(target._id);
  });
  return muscleGroupsById;
  // Object.keys(muscleGroups).map(muscleGroupId => muscleGroups[muscleGroupId]);
};

const groupExercisesByMuscleGroup = exercisesResult => {
  const muscleGroups = [];
  // const groupedExercisesById = exercisesResult; // []; // routineResult;
  const muscleGroupsById = groupByMuscleGroupExercises(exercisesResult);
  for (const muscleGroupId in muscleGroupsById) {
    if (muscleGroupId) {
      const muscleGroup = muscleGroupsById[muscleGroupId];
      const { targets, exercises } = muscleGroup;
      const { maxLastUpdated, updatedToday } =
        exercisesApi.addLastUpdatedToExercises(exercises);
      const newMuscleGroup = {
        ...muscleGroup,
        // targets: exerciseApi.sortByTarget(exercises),
        exercisesCount: exercises.length,
        targetsCount: targets.size,
        lastUpdated: maxLastUpdated,
        doneToday: updatedToday
      };
      delete newMuscleGroup.exercises;
      delete newMuscleGroup.targets;
      muscleGroups.push(newMuscleGroup);
    }
  }
  return muscleGroups;
};

// group exercises by muscle group. adding lastupdated, donetoday, targetsCount and exercisesCount
const addMuscleGroups = async routine => {
  const newRoutine = routine;
  const exercisesQuery = exerciseModel
    .getModel()
    .find({ routineId: routine._id }).select('name')
    .populate("muscleGroup", 'name')
    .populate("series")
    .populate("target", 'name')
    .populate("synergists")
    .populate("stabilizers");
  const exercisesResult = await exercisesQuery.lean().exec();
  const muscleGroups = groupExercisesByMuscleGroup(exercisesResult);
  newRoutine.muscleGroups = muscleGroups;
  // newRoutine.exercises = exercisesResult;
  // addLastUpdatedToRoutine(newRoutine);
};

const getRoutine = async routineId => {
  const routineQuery = routineModel.getModel()
    .findOne({ _id: routineId })
    .select('name');
  const routineResult = await routineQuery.lean().exec();
  await addMuscleGroups(routineResult);
  // await addExercisesToRoutine(routineResult);
  // delete routineResult.exercises;
  return routineResult;
};

const api = app => {
  app.get("/routine/:id", async (req, res) => {
    try {
    // next here for app
      const routines = await getRoutine(req.params.id);
      res.send(routines);
    } catch (error) {
      res.status(500).json(error);
    }
  });
};

module.exports = { api };
