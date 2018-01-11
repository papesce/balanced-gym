const exerciseModel = require("../model/exercise.model");
const muscleModel = require("../model/muscle.model");

const getTargets = async () => {
  const ExerciseModel = exerciseModel.getModel();
  const exQuery = ExerciseModel.find();
  exQuery.distinct("target"); // , { muscleGroup: "Chest" });
  const exResult = await exQuery.lean().exec();
  return exResult.sort();
};

const getMuscle = async muscleId => {
  const exQuery = muscleModel
    .getModel()
    .findOne({ _id: muscleId });
  const exResult = await exQuery.lean().exec();
  return exResult;
};

const getMuscles = async () => {
  const exQuery = muscleModel.getModel().find();
  // exQuery.distinct("target"); // , { muscleGroup: "Chest" });
  exQuery.sort("name");
  const exResult = await exQuery.lean().exec();
  return exResult;
};

const newMuscle = async muscle => {
  const MuscleModel = muscleModel.getModel();
  await new MuscleModel(muscle).save();
};

const updateMuscle = async (exId, exUpdate) => {
  const exQuery = muscleModel
    .getModel()
    .findOneAndUpdate({ _id: exId }, exUpdate, {
      new: true
    });
  const exResult = await exQuery.lean().exec();
  return exResult;
};

const api = app => {
  // app.get("/target", async (req, res) => {
  //   const targets = await getTargets();
  //   res.send(targets);
  // });

  app.get("/muscle", async (req, res) => {
    const targets = await getMuscles();
    res.send(targets);
  });

  app.get("/muscle/:id", async (req, res) => {
    const muscle = await getMuscle(req.params.id);
    res.send(muscle);
  });

  app.patch("/muscle/:id", async (req, res) => {
    const updatedMuscle = await updateMuscle(req.params.id, req.body);
    res.send(updatedMuscle);
  });


  app.post("/newMuscle", async (req, res) => {
    const muscle = await newMuscle(req.body);
    res.send(muscle);
  });

  // app.get("/removeSynergists", async (req, res) => {
  //   const exQuery = exerciseModel.getModel().find();
  //   const exResult = await exQuery.lean().exec();
  //   const proms = exResult.map(ex => {
  //     const { synergists } = ex;
  //     if (synergists) {
  //       const exQuery2 = exerciseModel.getModel().findOneAndUpdate(
  //         { _id: ex._id },
  //         {
  //           synergists: [],
  //         },
  //         { new: true }
  //       );
  //       return exQuery2.lean().exec();
  //     }
  //     return Promise.resolve();
  //   });
  //   await Promise.all(proms);

  //   res.send("done");
  // });

  // app.get("/convert", async (req, res) => {
  //   const exQuery = exerciseModel.getModel().find();
  //   const exResult = await exQuery.lean().exec();
  //   const proms = exResult.map(ex => {
  //     const { muscleURL } = ex;
  //     if (muscleURL) {
  //       const exQuery2 = exerciseModel.getModel().findOneAndUpdate(
  //         { _id: ex._id },
  //         {
  //           muscleURL: "",
  //           exerciseURL: muscleURL
  //         },
  //         { new: true }
  //       );
  //       return exQuery2.lean().exec();
  //     }
  //     return Promise.resolve();
  //   });
  //   Promise.all(proms);

  //   res.send("done");
  // });

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
