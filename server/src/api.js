const gym = require("./model/gym.model");

const api = app => {
  // respond with "hello world" when a GET request is made to the homepage
  app.get("/routine", async (req, res) => {
    const routines = await gym.getRoutines();
    res.send(routines);
  });

  app.get("/routine/:id", async (req, res) => {
    const routines = await gym.getRoutine(req.params.id);
    res.send(routines);
  });

  app.get("/muscleGroup", async (req, res) => {
    const muscleGroup = await gym.getMuscleGroup(req.query);
    res.send(muscleGroup);
  });

  app.get("/exercise", async (req, res) => {
    const exercises = await gym.getExercises(req.query);
    res.send(exercises);
  });

  app.get("/exercise/:id", async (req, res) => {
    const exercises = await gym.getExercise(req.params.id);
    res.send(exercises);
  });

  app.patch("/exercise/:id", async (req, res) => {
    const updatedExercise = await gym.updateExercise(req.params.id, req.body);
    res.send(updatedExercise);
  });

  app.post("/newExercise/:routineId", async (req, res) => {
    const exercise = await gym.newExercise(req.params.routineId, req.body);
    res.send(exercise);
  });

  app.patch("/serie/:id", async (req, res) => {
    const updatedSerie = await gym.updateSerie(req.params.id, req.body);
    res.send(updatedSerie);
  });

  app.delete("/serie/:id", async (req, res) => {
    const deletedSerie = await gym.deleteSerie(req.params.id);
    res.send(deletedSerie);
  });

  app.post("/newSerie/:exerciseId", async (req, res) => {
    const serie = await gym.newSerie(req.params.exerciseId);
    res.send(serie);
  });

  app.get("/muscleGroup", async (req, res) => {
    const muscleGroups = await gym.getMuscleGroups();
    res.send(muscleGroups);
  });

  app.get("/target", async (req, res) => {
    const targets = await gym.getTargets();
    res.send(targets);
  });

  app.get("/filter", async (req, res) => {
    const filters = await gym.getFilters();
    res.send(filters);
  });
};

module.exports = api;
