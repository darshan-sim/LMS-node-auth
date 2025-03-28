import { ValidationRule } from "../decorators/validation.decorators";

export function validateDTO(dto: any): string[] {
	const errors: string[] = [];
	const validations: { [property: string]: ValidationRule } =
		dto.constructor.prototype.__ValidationRule__ || {};

	for (const property in validations) {
		const rules = validations[property];
		const value = dto[property];
		if (
			rules.required &&
			(value === undefined || value === null || value.trim() === "")
		) {
			errors.push(`Property "${property}" is require`);
		}
		if (
			rules.minLength &&
			typeof value === "string" &&
			value.length < rules.minLength
		) {
			errors.push(
				`Property "${property}" must have at least ${rules.minLength} characters.`
			);
		}
		if (
			rules.maxLength &&
			typeof value === "string" &&
			value.length > rules.maxLength
		) {
			errors.push(
				`Property "${property}" must have no more than ${rules.maxLength} characters.`
			);
		}
		if (
			rules.allowedValues &&
			!rules.allowedValues.includes(value.toLowerCase())
		) {
			errors.push(
				`Property "${property}" must be one of: ${rules.allowedValues.join(
					", "
				)}.`
			);
		}
	}
	return errors;
}
