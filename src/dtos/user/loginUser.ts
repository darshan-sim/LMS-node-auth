import { Require } from "../../decorators/validation.decorators";

export class RegisterUserDTO{

    @Require()
    username!:string
    
    @Require()
    password!:string
}