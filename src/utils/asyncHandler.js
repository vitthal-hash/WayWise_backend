/// Wraps an async Express route handler so any rejected promise is
/// forwarded to next(err) instead of crashing the process unhandled.
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = asyncHandler;
