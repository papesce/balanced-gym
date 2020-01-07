// PLAN: some targets are more important than others?
const sortTargets = (list) => {
  list.sort((r1, r2) => new Date(r1.lastUpdated) > new Date(r2.lastUpdated));
};

const sortByLastUpdated = (list) => {
  list.sort((r1, r2) => new Date(r1.lastUpdated) > new Date(r2.lastUpdated));
};
const sort = (list, comp) => {
  list.sort((r1, r2) => comp(r1) > comp(r2));
};

const isToday = (someDate) => {
  const today = new Date();
  return someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear();
};


module.exports = {
  sort, sortByLastUpdated, sortTargets, isToday
};
