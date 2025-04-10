import { FieldError } from "../errors/AppError";

export function validateDTO(dto: any): FieldError[] {
	const errors: FieldError[] = [];
	const validations = dto.constructor.prototype.__ValidationRule__ || {};

	for (const property in validations) {
		const rules = validations[property];
		const value = dto[property];

		if (
			rules.required &&
			(value === undefined || value === null || value.trim() === "")
		) {
			errors.push({
				code: "VALIDATION_REQUIRED",
				field: property,
				message: `Property '${property}' is required`
			});
		}

		if (
			rules.minLength &&
			typeof value === "string" &&
			value.length < rules.minLength
		) {
			errors.push({
				code: "VALIDATION_MIN_LENGTH",
				field: property,
				message: `Property '${property}' must have at least ${rules.minLength} characters.`
			});
		}

		if (
			rules.maxLength &&
			typeof value === "string" &&
			value.length > rules.maxLength
		) {
			errors.push({
				code: "VALIDATION_MAX_LENGTH",
				field: property,
				message: `Property '${property}' must have no more than ${rules.maxLength} characters.`
			});
		}

		if (rules.confirmedPassword) {
			const originalValue = dto[rules.confirmedPassword];
			if (value !== originalValue) {
				errors.push({
					code: "VALIDATION_PASSWORD_MISMATCH",
					field: property,
					message: `Confirmed password does not match the password.`
				});
			}
		}

		if (
			rules.allowedValues &&
			!rules.allowedValues.includes(value.toLowerCase())
		) {
			errors.push({
				code: "VALIDATION_INVALID_VALUE",
				field: property,
				message: `Property '${property}' must be one of: ${rules.allowedValues.join(
					", "
				)}.`
			});
		}
	}

	return errors;
}
