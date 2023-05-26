import { RoleTypeEnum } from "../enum/role-type.enum";
import { UserInterface } from "../interface/user.interface";

export class UserDto implements UserInterface {

    username: string;
    password: string;
    roleType: RoleTypeEnum;

    constructor(username: string, password: string, roleType: RoleTypeEnum) {
        this.username = username;
        this.password = password;
        this.roleType = roleType;
    }

    public getUsername(): string {
        return this.username;
    }

    public getRoleType(): RoleTypeEnum {
        return this.roleType;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public setRoleType(roleType: RoleTypeEnum): void {
        this.roleType = roleType;
    }
}