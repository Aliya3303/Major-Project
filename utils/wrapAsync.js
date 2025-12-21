module.exports = (fn) => {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(err => {
      if (typeof next === "function") {
        next(err);
      } else {
        console.error(err);
      }
    });
  };
};
