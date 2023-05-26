import { UserInterface } from "../interface/user.interface";
import { RoleTypeEnum } from "../enum/role-type.enum";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { PermissionTypeEnum } from "../enum/permission-type.enum";

@Schema({collection: "permission", versionKey: false, timestamps: true})
export class PermissionEntity {

    @Prop({required: true, unique: true, index: true})
    roleType: string;

    @Prop({required: true})
    permissions: Array<PermissionTypeEnum>;
}

export const PermissionSchema = SchemaFactory.createForClass(PermissionEntity);