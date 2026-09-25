export interface ApiResponseOptions<T> {
    data?: T | null;
    message?: string;
}

export class ApiResponse<T = unknown> {
    public readonly success: boolean;
    public readonly message: string;
    public readonly data: T | null;

    constructor({
        data = null,
        message = 'Success',
    }: ApiResponseOptions<T>) {
        this.success = true;
        this.message = message;
        this.data = data;
    }
}