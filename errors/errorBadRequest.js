const { StatusCodes } = require('http-status-codes');
const CustomErrorApi = require('./CustomErrorApi');

class errorBadRequest extends CustomErrorApi {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = errorBadRequest;