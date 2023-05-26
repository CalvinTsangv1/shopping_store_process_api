import { RoleTypeEnum } from "../enum/role-type.enum";

export interface UserInterface {
    username: string;
    password: string;
    roleType: RoleTypeEnum;
}