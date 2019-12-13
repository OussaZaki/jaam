/**
 * NetworkError class for custome app errors
 *
 * TODO: not sure if this will be needed
 * the idea is to separate App errors from Network errors for better error logging and filtering.
 */
class NetworkError extends Error {
  constructor(type = 'NETWORK_ERROR', ...params) {
    // Pass remaining arguments to parent constructor
    super(...params);

    this.type = type;
    this.date = new Date();
  }
};

export default NetworkError;
