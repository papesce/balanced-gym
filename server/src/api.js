const GymModel = require('./models/gym.model.js');

const gym = new GymModel();

async function getRoutines2(req, res) {
  const routines = await gym.getRoutines2();
  res.send(routines);
}

module.exports = { getRoutines2 };
