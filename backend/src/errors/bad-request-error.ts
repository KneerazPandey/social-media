import ApiError from './api-error.js';

export default class BadRequestError extends ApiError {
    constructor(message = 'Bad request. Please try agian') {
        super(400, message);
    }
}