export class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends ApiError {
  constructor(message, statusCode) {
    super(message, 400);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message, statusCode) {
    super(message, 401);
  }
}

export class NotFoundError extends ApiError {
  constructor(message, statusCode) {
    super(message, 404);
  }
}

export class ConflictError extends ApiError {
  constructor(message, statusCode) {
    super(message, 409);
  }
}

export class InternalServerError extends ApiError {
  constructor(message, statusCode) {
    super(message, 500);
  }
}
