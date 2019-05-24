function hasMinimumTimeElapsed(startTime, minimum) {
  return startTime && minimum ? Date.now() - startTime > minimum : true;
}

module.exports = {
  hasMinimumTimeElapsed,
};
