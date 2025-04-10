import {
	Require,
	MinLength,
	ConfirmedPassword
} from "../../decorators/validation.decorators";

export class RegisterUserDTO {
	@Require()
	@MinLength(3)
	username!: string;

	@Require()
	@MinLength(3)
	password!: string;

	@Require()
	@MinLength(3)
	@ConfirmedPassword("password")
	confirmedPassword!: string;

	type!: string;
}
