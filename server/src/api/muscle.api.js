const exerciseModel = require("../model/exercise.model");
const muscleModel = require("../model/muscle.model");

const getTargets = async () => {
  const ExerciseModel = exerciseModel.getModel();
  const exQuery = ExerciseModel.find();
  exQuery.distinct("target"); // , { muscleGroup: "Chest" });
  const exResult = await exQuery.lean().exec();
  return exResult.sort();
};
const getMuscles = async () => {
  const exQuery = muscleModel.getModel().find();
  // exQuery.distinct("target"); // , { muscleGroup: "Chest" });
  const exResult = await exQuery.lean().exec();
  return exResult.sort();
};

const newMuscle = async muscle => {
  const MuscleModel = muscleModel.getModel();
  await new MuscleModel(muscle).save();
};

const api = app => {
  app.get("/target", async (req, res) => {
    const targets = await getTargets();
    res.send(targets);
  });
  app.get("/muscle", async (req, res) => {
    const targets = await getMuscles();
    res.send(targets);
  });
  app.post("/newMuscle", async (req, res) => {
    const muscle = await newMuscle(req.body);
    res.send(muscle);
  });
  // app.get("/convert", async (req, res) => {
  //   let exQuery = muscleModel.getModel().find();
  //   // exQuery.distinct("target"); // , { muscleGroup: "Chest" });
  //   let exResult = await exQuery.lean().exec();
  //   const set = {};
  //   exResult.forEach(muscle => {
  //     set[muscle.name] = muscle._id;
  //   });

  //   exQuery = exerciseModel
  //     .getModel()
  //     .find()
  //     .populate({
  //       path: "series"
  //     });
  //   //  exQuery.sort({ muscleGroup: 1, target: 1 });
  //   exResult = await exQuery.lean().exec();
  //   const proms = exResult.map(ex => {
  //     const { target } = ex;
  //     const targetid = set[target];
  //     if (targetid) {
  //       const exQuery2 = exerciseModel.getModel().findOneAndUpdate(
  //         { _id: ex._id },
  //         { target: targetid },
  //         {
  //           new: true
  //         }
  //       );
  //       return exQuery2.lean().exec();
  //     }
  //     return Promise.resolve();
  //   });
  //   Promise.all(proms);

  //   res.send("done");
  // });
};

module.exports = { api };
