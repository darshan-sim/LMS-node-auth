import { User, UserType } from "../models/user";

export class UserService {
    
    static getUser(id: string) {
        const user = User.findById(id)
        if (!user) {
            return ({ message: "No user found" });
        }
        const responseUser:userResponse = convertToUser(user)
        return { message: "No user found", user: responseUser };
    }
    
	static deleteUser(id: string) {
        const row = User.deleteById(id)
        if(row > 0){
            return { message: "User Deleted"};
        }else{
            return { message: "Unable to delete"};
        }
    }
    
	static getAllUsers() {
        const users = User.findAll()
        if (users.length <= 0) {
            return({ message: "No users found" });
        }
        const responseUsers: userResponse[] = users.map((user) =>
					convertToUser(user)
				);
        return { message: "No users found" ,users: responseUsers}
    }

	static updateUser(id:string, type: UserType) {
        const user = User.update({id, type})
        if (!user) {
            return { message: "Can't update user"};
        }
        const responseUser:userResponse = convertToUser(user);
        return { message: "User updated successfully",user: responseUser};
    }

}

type userResponse = {
    id: string;
    username: string;
    type: UserType;
}

const convertToUser = (user: User): userResponse => {
    return {
        id: user.id,
        username: user.username,
        type: user.type 
    };
};