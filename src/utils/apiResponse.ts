export interface ApiSuccess<T = any> {
	success: true;
	message: string;
	data: T;
}

export interface ApiError {
	success: false;
	message: string;
	errors: {
		code: string;
		field: string | null;
		message: string;
	}[];
}

export function successResponse<T>(message: string, data: T): ApiSuccess<T> {
	return {
		success: true,
		message,
		data
	};
}

export function errorResponse(error: {
	message: string;
	statusCode?: number;
	errors?: {
		code: string;
		field: string | null;
		message: string;
	}[];
}): ApiError {
	return {
		success: false,
		message: error.message,
		errors: error.errors ?? []
	};
}
