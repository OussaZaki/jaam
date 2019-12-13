/**
 * AppError class for custome app errors
 *
 * TODO: inspect the stack trace flow.
 */
class AppError extends Error {
  constructor(type = 'DEFAULT', ...params) {
    // Pass remaining arguments to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8).
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }

    this.type = type;
    this.date = new Date();
  }
};

export default AppError;
