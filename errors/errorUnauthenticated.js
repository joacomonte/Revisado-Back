const { StatusCodes } = require('http-status-codes');
const CustomErrorApi = require('./CustomErrorApi');

class errorUnauthenticated extends CustomErrorApi {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = errorUnauthenticated;