const exerciseModel = require("../model/exercise.model");
const muscleGroupModel = require("../model/muscleGroup.model");
const exerciseApi = require("./exercise.api");
const routineApi = require("./routine.api");


const getMuscleGroup = async query => {
  const ExerciseModel = exerciseModel.getModel();
  const exercisesQuery = ExerciseModel.find(query)
    .populate("muscleGroup")
    .populate("series")
    .populate("target")
    .populate("synergists")
    .populate("stabilizers");
  const exercisesResult = await exercisesQuery.lean().exec();
  const res = exerciseApi.addLastUpdatedToExercises(exercisesResult);
  const muscleGroup = {
    muscleGroup: query.muscleGroup,
    targets: exerciseApi.sortByTarget(exercisesResult),
    lastUpdated: routineApi.getLasUpdatedFromExercises(exercisesResult),
    doneToday: res.updatedToday
  };
  return muscleGroup;
};

const getMuscleGroups = async () => {
  const MuscleGroupModel = muscleGroupModel.getModel();
  const mQuery = MuscleGroupModel.find().select('name');
  const mResult = await mQuery.lean().exec();
  return mResult.sort();
};

// const newMuscleGroup = async (name) => {
//   const MuscleGroupModel = muscleGroupModel.getModel();
//   await new MuscleGroupModel({
//     name,
//   }).save();
// };

// const createMuscleDictionary = (muscleGroupResult) => {
//   const result = {};
//   muscleGroupResult.forEach(muscleGroup => {
//     result[muscleGroup.name] = muscleGroup._id;
//   });
//   return result;
// }

const api = app => {
  // app.get("/newMuscleGroupTable", async (req, res) => {
  //   await newMuscleGroup("Chest");
  //   await newMuscleGroup("Triceps");
  //   await newMuscleGroup("Forearms");
  //   await newMuscleGroup("Thighs");
  //   await newMuscleGroup("Shoulders");
  //   await newMuscleGroup("Calves");
  //   await newMuscleGroup("Back");
  //   await newMuscleGroup("Biceps");
  //   await newMuscleGroup("Waist");
  //   await newMuscleGroup("Lats-Neck-Traps");
  //   await newMuscleGroup("Hips");
  //   res.status(200).send("done !");
  // });
  // app.get("/refatorExercises", async (req, res) => {
  //   const muscleGroups = await getMuscleGroups();
  //   const muscleDict = createMuscleDictionary(muscleGroups);
  //   // console.log("muscle group dict:", muscleDict);
  //   const ExerciseModel = exerciseModel.getModel();
  //   const exercisesQuery = ExerciseModel.find();
  //   const exercisesResult = await exercisesQuery.lean().exec();
  //   const results = [];
  //   exercisesResult.forEach(exercise => {
  //     const muscleName = exercise.muscleGroup;
  //     const muscleId = muscleDict[muscleName];
  //     // console.log('muscle for exercise:', exercise._id, exercise.muscleGroup, muscleId);
  //     results.push(exerciseApi.updateExercise(exercise._id, { muscleGroup: muscleId }));
  //   });
  //   await Promise.all(results);
  //   res.status(200).send("Done ! check the results");
  // });
  app.get("/muscleGroup", async (req, res) => {
    const muscleGroup = await getMuscleGroup(req.query);
    res.send(muscleGroup);
  });
  app.get("/muscleGroups", async (req, res) => {
    const muscleGroups = await getMuscleGroups();
    res.send(muscleGroups);
  });
};

module.exports = { api };
