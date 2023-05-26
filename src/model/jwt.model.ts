import { RoleTypeEnum } from "src/module/user/enum/role-type.enum";
import { PermissionTypeEnum } from "src/module/user/enum/permission-type.enum";

export interface JwtModel {
    username: string;
    role: RoleTypeEnum;
    permissions: PermissionTypeEnum;
}