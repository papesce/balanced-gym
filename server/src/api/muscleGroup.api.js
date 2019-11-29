const exerciseModel = require("../model/exercise.model");
// const exerciseApi = require("./exercise.api");
// const routineApi = require("./routine.api");


// TODO: In the future this can be avoided with a many2many relationship between
// ecercise and muscleGrup
const groupByTargetExercises = exercises => {
  const targetsById = {};
  exercises.forEach(exercise => {
    const { target } = exercise;
    // TODO: group by muscle group ID
    const targetId = target._id;
    if (!targetsById[targetId]) {
      targetsById[targetId] = { ...target, exercises: [] };
    }
    targetsById[targetId].exercises.push(exercise);
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
      const { exercises } = target;
      //     const { maxLastUpdated, updatedToday } =
      //       exercisesApi.addLastUpdatedToExercises(exercises);
      const newTarget = {
        ...target,
        //       // targets: exerciseApi.sortByTarget(exercises),
        exercisesCount: exercises.length,
        //       targetsCount: targets.size,
        //       lastUpdated: maxLastUpdated,
        //       doneToday: updatedToday
      };
      delete newTarget.exercises;
      //     delete newMuscleGroup.targets;
      targets.push(newTarget);
    }
  }
  return targets;
};

const getMuscleGroup = async (routineId, muscleGroupId) => {
  const ExerciseModel = exerciseModel.getModel();
  const exercisesQuery = ExerciseModel.find({ routineId, muscleGroup: muscleGroupId }).select('name target')
    //.populate("muscleGroup")
    //.populate("series")
    .populate("target", "name");
    //.populate("synergists")
    //.populate("stabilizers");
  const exercisesResult = await exercisesQuery.lean().exec();
  const targets = groupExercisesByTarget(exercisesResult);
  // const res = exerciseApi.addLastUpdatedToExercises(exercisesResult);
  const muscleGroup = {
    // tempResult: exercisesResult
    targets
    // ...muscleGroup: query.muscleGroup,
    // targets: exerciseApi.sortByTarget(exercisesResult),
    // lastUpdated: routineApi.getLasUpdatedFromExercises(exercisesResult),
    // doneToday: res.updatedToday
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
