import BaseError from "./base-error.js";


export default class ApiError extends BaseError {
    constructor(statusCode: number, message: string) {
        super(message, statusCode);
    }
}