import {
	Require,
	MinLength,
	Values
} from "../../decorators/validation.decorators";
import { UserType } from "../../models/user";

export class RegisterUserDTO {
	@Require()
	@MinLength(3)
	username!: string;

	@Require()
	@MinLength(3)
	password!: string;

	@Require()
	@Values(UserType)
	type!: string;
}
