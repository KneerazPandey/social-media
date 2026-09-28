import BaseError from "./base-error.js";


export default class ApiError extends BaseError {
    public readonly errors: unknown;

    constructor(
        statusCode: number,
        message: string,
        errors: unknown = null,
    ) {
        super(message, statusCode);
        this.errors = errors;
    }

}