class AppError extends Error {
  constructor(type = 'DEFAULT', ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }

    this.type = type;
    this.date = new Date();
  }
};

export default AppError;
