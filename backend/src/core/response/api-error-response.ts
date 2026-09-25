export interface ApiErrorResponseOptions {
    message: string;
    statusCode: number;
    errors?: unknown;
}

export class ApiErrorResponse {
    public readonly success = false;
    public readonly message: string;
    public readonly errors: unknown;

    constructor({
        message,
        errors = null,
    }: ApiErrorResponseOptions) {
        this.message = message;
        this.errors = errors;
    }
}