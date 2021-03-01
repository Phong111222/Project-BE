export default class ErrorResponse {
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
