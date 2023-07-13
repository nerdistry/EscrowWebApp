// Not found.

const notFound = (req, res, next) => {
    const error = new Error(`Not Found : ${req.originalUrl}`);
    res.status(404);
    //Pass the error to the next middleware.
    next(error);
}

// Error handler for API.

const errorHandler = (err, req, res, next) => {
    const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statuscode);
    res.json({
      status: "fail",
      message: err?.message,
      stack: err?.stack,
    });
  };
  
module.exports = {errorHandler, notFound}