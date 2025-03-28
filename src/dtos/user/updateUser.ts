import { Require, Values} from "../../decorators/validation.decorators";
import { UserType } from "../../models/user";

export class RegisterUserDTO {
	@Require()
	@Values(UserType)
	type!: string;
}
