const serieModel = require("../model/serie.model");
const exerciseModel = require("../model/exercise.model");
const exerciseAppApi = require("./exercise.app.api");

const newSerie = async (exerciseId, body) => {
  // console.log('newserie body', body);
  const SerieModel = serieModel.getModel();
  const { suggestedSerie = { reps: 10, weight: 1 } } = body;
  const nSerie = await new SerieModel(suggestedSerie).save();
  const ExerciseModel = exerciseModel.getModel();
  const ex = await ExerciseModel.findById(exerciseId).exec();
  ex.series.push(nSerie);
  ex.lastUpdated = nSerie.createdAt;
  // temporary hack"
  // if (!ex.target) ex.target = "";
  // if (!ex.gifURL) ex.gifURL = "";
  // if (!ex.equipment) ex.equipment = "";
  await ex.save();
  return nSerie;
};

const updateSerie = async (serieId, serieUpdate) => {
  // in the future see node-mongoose-es7 starter book
  // console.log('updating serie:', serieId, serieUpdate);
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

// const getSeries = async (ex) => {
//   const seriesQuery = serieModel.getModel().find();
//   const series = await seriesQuery.lean().exec();
//   return series;
// };

const addRestTime = async (proms, series) => {
  // const series = await getSeries();
  // console.log(ex._id);
  // if (ex._id.toString() === '59ee3dde243a5977dab96c2d') {
  //   console.log('series', series.length);
  // }
  for (let index = 0; index < series.length; index += 1) {
    // console.log('analyzing pair:', index, index + 1);
    if (index < series.length - 1) {
      const serieOlder = series[index];
      const serieNewer = series[index + 1];
      const ms1 = new Date(serieOlder.createdAt).getTime();
      const ms2 = new Date(serieNewer.createdAt).getTime();
      const diff = ms1 - ms2;
      // if (ex._id.toString() === '59ee3dde243a5977dab96c2d') {
      //   console.log("diff:", diff / 1000, diff / 60000);
      // }
      const secs = Math.round(diff / 1000);
      if (diff > 0 && diff < 1000 * 60 * 60) {
        // if (ex._id.toString() === '59ee3dde243a5977dab96c2d') {
        //   console.log('add rest time !');
        // }
        proms.push(updateSerie(serieOlder._id, { restTime: secs }));
      }
    }
    //     console.log('older', serieOlder.reps);
    //     console.log('newer', serieNewer.reps);
  }
};

const api = app => {
  app.patch("/api/updateSerie/:id/exercise/:exerciseId", async (req, res) => {
    try {
      const updatedSerie = await updateSerie(req.params.id, req.body);
      const exercise = await exerciseAppApi.getExercise(req.params.exerciseId);
      res.send({ exercise, serie: updatedSerie });
    } catch (error) {
      console.log('Error in api/updateSerie/:id/exercise/:exerciseId', error.msg);
      res.status(500).send();
    }
  });

  app.delete("/api/deleteSerie/:id/exercise/:exerciseId", async (req, res) => {
    const deletedSerie = await deleteSerie(req.params.id);
    const exercise = await exerciseAppApi.getExercise(req.params.exerciseId);
    res.send({ exercise, serie: deletedSerie });
  });

  app.post("/api/newSerie/:exerciseId", async (req, res) => {
    try {
      const serie = await newSerie(req.params.exerciseId, req.body);
      const exercise = await exerciseAppApi.getExercise(req.params.exerciseId);
      res.send({ exercise, serie });
    } catch (error) {
      console.log('error in api/newSerie');
      res.status(500).send();
    }
    // res.send(serie);
  });
  app.get('/populateRestTime', async (req, res) => {
    const seriesQuery = serieModel.getModel().find().sort({
      createdAt: -1
    });
    // const Query = exerciseModel.getModel().find();
    // .populate({
    //   path: 'series',
    //   select: 'createdAt reps weight restTime',
    //   options: { limit: 100, sort: { createdAt: -1 } }
    // });
    const series = await seriesQuery.lean().exec();
    console.log('series', series.length);
    const proms = [];
    addRestTime(proms, series);
    await Promise.all(proms);
    res.status(200).send('done 6');
  });
};

module.exports = { api };
