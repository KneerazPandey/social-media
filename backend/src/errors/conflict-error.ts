import ApiError from './api-error.js';

export default class ConflictError extends ApiError {
    constructor(message = 'This resources already exists.') {
        super(401, message);
    }
}