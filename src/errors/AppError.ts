export interface FieldError {
	code: string; 
	field: string | null;
	message: string;
}

export class AppError extends Error {
	statusCode: number;
	errors?: FieldError[];

	constructor(message: string, statusCode = 500, errors?: FieldError[]) {
		super(message);
		this.statusCode = statusCode;
		this.errors = errors;
		Error.captureStackTrace(this, this.constructor);
	}
}
