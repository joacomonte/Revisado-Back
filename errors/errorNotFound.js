const { StatusCodes } = require('http-status-codes');
const CustomErrorApi = require('./CustomErrorApi');

class errorNotFound extends CustomErrorApi {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = errorNotFound;