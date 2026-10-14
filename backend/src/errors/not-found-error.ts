import ApiError from './api-error.js';

export default class NotFoundError extends ApiError {
    constructor(message = 'Content Not Found. Please Try Again.') {
        super(404, message);
    }
}