import { UserInterface } from "../interface/user.interface";
import { RoleTypeEnum } from "../enum/role-type.enum";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { PermissionTypeEnum } from "../enum/permission-type.enum";

@Schema({collection: "user", versionKey: false, timestamps: true})
export class UserEntity implements UserInterface {

    @Prop({required: true, unique: true, index: true})
    username: string;

    @Prop({required: true, default: RoleTypeEnum.BUYER})
    roleType: RoleTypeEnum;

    @Prop({required: true})
    password: string;

    @Prop({default:""})
    additionalInformation: string;

    @Prop()
    avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);