const serieModel = require("../model/serie.model");
const exerciseModel = require("../model/exercise.model");
const exerciseAppApi = require("./exercise.app.api");

const newSerie = async exerciseId => {
  const SerieModel = serieModel.getModel();
  const nSerie = await new SerieModel({ reps: 10, weight: 1 }).save();
  const ExerciseModel = exerciseModel.getModel();
  const ex = await ExerciseModel.findById(exerciseId).exec();
  ex.series.push(nSerie);
  ex.lastUpdated = nSerie.createdAt;
  // temporary hack"
  if (!ex.target) ex.target = "";
  if (!ex.gifURL) ex.gifURL = "";
  if (!ex.equipment) ex.equipment = "";
  await ex.save();
  return nSerie;
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


const api = app => {
  app.patch("/api/serie/:id", async (req, res) => {
    const updatedSerie = await updateSerie(req.params.id, req.body);
    res.send(updatedSerie);
  });

  app.delete("/api/exercise/:exerciseId/serie/:id", async (req, res) => {
    const deletedSerie = await deleteSerie(req.params.id);
    const exercise = await exerciseAppApi.getExercise(req.params.exerciseId);
    res.send({ exercise, deletedSerie });
    // setTimeout(() => res.send({ exercise, deletedSerie }), 2000);
    // res.send(deletedSerie);
  });

  app.post("/api/newSerie/:exerciseId", async (req, res) => {
    const serie = await newSerie(req.params.exerciseId);
    const exercise = await exerciseAppApi.getExercise(req.params.exerciseId);
    res.send({ exercise, serie });
    // res.send(serie);
  });
};

module.exports = { api };
