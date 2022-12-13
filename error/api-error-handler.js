
function apiErrorHandler(err, req, res, next) {
  
  return res.status(err.status || 500).json({
    message: err.message,
    result: false,
  });
}

module.exports = apiErrorHandler;
