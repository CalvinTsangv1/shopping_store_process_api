import { PermissionTypeEnum } from "../enum/permission-type.enum";
import { RoleTypeEnum } from "../enum/role-type.enum";

export interface JwtInterface {
    permissions: PermissionInterface;
    role: RoleTypeEnum;
}

export interface PermissionInterface {
    [key: string]: Array<PermissionTypeEnum>;
}
