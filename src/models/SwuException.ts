export class SwuIdException extends Error {
    status!: number;
    success!: boolean;
    message!: string;

    constructor(status: number, success: boolean, message: string) {
        super(message);

        if (Error.captureStackTrace) Error.captureStackTrace(this, SwuIdException);

        Object.setPrototypeOf(this, SwuIdException.prototype);

        this.status = status;
        this.success = success;
        this.message = message;
    }
}
