import { UserInterface } from "../interface/user.interface";
import { RoleTypeEnum } from "../enum/role-type.enum";
import { IsEnum, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserAuthenticationRequestDto implements UserInterface {
   
    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsEnum(RoleTypeEnum)
    roleType: RoleTypeEnum;
}