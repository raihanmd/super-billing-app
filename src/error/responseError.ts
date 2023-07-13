export class ResponseError extends Error {
  statusCode: number;
  payload: string | object;
  constructor(statusCode: number, payload: object | string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.payload = payload;
  }
}
