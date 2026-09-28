import ApiError from './api-error.js';

export default class UploadError extends ApiError {
    constructor(message = 'Unable to upload resources at the moment. Please try again.') {
        super(401, message);
    }
}