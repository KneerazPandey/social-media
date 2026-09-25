import BaseError from "./base-error.js";


class EnvError extends BaseError {
    constructor(message?: string) {
        super(message || 'Unable to get Environment variables. Please try again.', 500);
    }
}

export default EnvError;