export class WeatherError extends Error {
  constructor(message, statusCode, rootCauseClass) {
    super(message);
    this.statusCode = statusCode;
    this.rootCauseClass = rootCauseClass;
  }
}

