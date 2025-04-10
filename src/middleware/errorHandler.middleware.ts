import { ErrorRequestHandler } from "express";
import { AppError } from "../errors/AppError";
import { errorResponse } from "../utils/apiResponse";

export const errorHandler: ErrorRequestHandler = (
	err,
	req,
	res,
	_next
): void => {
	if (err instanceof AppError) {
		res.status(err.statusCode).json(
			errorResponse({
				message: err.message,
				statusCode: err.statusCode,
				errors: err.errors
			})
		);
		return;
	}

	res.status(500).json(
		errorResponse({
			message: "Unexpected server error",
			statusCode: 500,
			errors: [
				{
					code: "INTERNAL_SERVER_ERROR",
					field: null,
					message: err.message ?? "Something went wrong"
				}
			]
		})
	);
	return;
};
