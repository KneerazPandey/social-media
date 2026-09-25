import BaseError from "./base-error.js";

export default class DatabaseConnectionError extends BaseError {
    constructor(string?: string) {
        super("Unable to connect to databse server. Please try again.", 500);
    }
}