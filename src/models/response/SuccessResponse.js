export default class SuccessResponse {
  constructor(statusCode, data, success = true) {
    this.statusCode = statusCode;
    this.data = data;
    this.success = success;
  }
}
