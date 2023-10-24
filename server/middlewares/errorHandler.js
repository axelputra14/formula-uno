const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err.message == "VERIFYUSER_NOT_FOUND") {
    statusCode = 400;
    message =
      "The email you are trying to verify does not exist or the verification link has expired or have been verified. Try to register or login.";
  }

  if (err.message == "LOGIN_ERROR") {
    statusCode = 400;
    message = "Email and password cannot be empty";
  }

  if (err.message == "LOGIN_NOT_FOUND") {
    statusCode = 401;
    message = "Email or password is wrong.";
  }

  if (err.message == "MISMATCHED_UNIQUE") {
    statusCode = 401;
    message = "Verification failed. Please try register again.";
  }

  if (err.message == "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token, login first";
  }

  if (err.message == "HAVENOT_VERIFY") {
    statusCode = 401;
    message = "You haven't verify your email. Verify first";
  }

  res.status(statusCode).json({
    statusCode,
    message,
  });
};

module.exports = errorHandler;
