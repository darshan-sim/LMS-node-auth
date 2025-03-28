export interface ValidationRule {
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	allowedValues?: any[];
}

function addValidationMetadata(
	target: any,
	propKey: string,
	rule: Partial<ValidationRule>
) {
	if (!target.__ValidationRule__) {
		target.__ValidationRule__ = {};
	}
	if (!target.__ValidationRule__[propKey]) {
		target.__ValidationRule__[propKey] = {};
	}
	Object.assign(target.__ValidationRule__[propKey], rule);
}

export function Require() {
	return function (target: any, propKey: string) {
		addValidationMetadata(target, propKey, { required: true });
	};
}

export function MinLength(length: number) {
	return function (target: any, propKey: string) {
		addValidationMetadata(target, propKey, { minLength: length });
	};
}

export function MaxLength(length: number) {
	return function (target: any, propKey: string) {
		addValidationMetadata(target, propKey, { maxLength: length });
	};
}

export function Values<T extends Object>(type: T) {
	return function (target: any, propKey: string) {
		const allowedValues = Object.values(type);
		if (!Array.isArray(allowedValues) || allowedValues.length === 0) {
			throw new Error(
				`@Values decorator requires an Enum or Object with values array.`
			);
		}

		addValidationMetadata(target, propKey, {
			allowedValues
		});
	};
}
