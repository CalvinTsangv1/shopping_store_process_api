import { Injectable, Logger } from "@nestjs/common";
import { UserAuthenticationRequestDto } from "../dto/user-authentication.request.dto";
import * as bcrypt from "bcrypt";
import { UserEntity } from "../entity/user.entity";
import { Model } from "mongoose";
import { RoleTypeEnum } from "../enum/role-type.enum";
import { plainToClass } from "class-transformer";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { PermissionTypeEnum } from "../enum/permission-type.enum";
import { PermissionEntity } from "../entity/permission.entity";

const SALT_ROUNDS = 10;
@Injectable()
export class UserService {

    private readonly logger = new Logger(UserService.name);

    constructor(readonly jwtService: JwtService, @InjectModel(UserEntity.name) private userModel: Model<UserEntity>, @InjectModel(PermissionEntity.name) private permissionModel: Model<PermissionEntity>) {}

    public async isExistingUser(username: string, roleType: RoleTypeEnum): Promise<boolean> {
        return !! this.userModel.exists({username: username, roleType: roleType})
    }
 
    public async createUser(dto: UserAuthenticationRequestDto): Promise<boolean> {
        const hashPassword = await bcrypt.hash(dto.password, SALT_ROUNDS);
        
        await this.isExistingUser(dto.username, dto.roleType).then((result) => {
            if(!result)
                throw new Error("User already exists, Please use a different username")
        })

        //hash password
        await bcrypt.hash(dto.password, SALT_ROUNDS, async (err, hash) => {
            if(err)
                throw new Error("Error while hashing password")
            const newUser = plainToClass(UserEntity,dto)
            newUser.password = hash;

            await this.userModel.create(newUser).then((result) => {
                this.logger.log(`result: ${result}`)
            })
        })
        return true;
    }

    public async login(dto: UserAuthenticationRequestDto): Promise<string> {
        const userResult = await this.userModel.findOne({username: dto.username, roleType: dto.roleType});

        if(userResult == null) throw new Error("User not found")

        const permissionResults = await this.permissionModel.findOne({roleType: dto.roleType})
        
        if(await bcrypt.compare(dto.password, userResult.password)){
            return this.getJwtToken(userResult.username, userResult.roleType,permissionResults.permissions)
        }
    }

    private async getJwtToken(username: string, roleType: RoleTypeEnum, permission: Array<PermissionTypeEnum>): Promise<string> {

        return this.jwtService.signAsync({username: username, role: roleType, permission: permission}, {secret: process.env.SECRET_KEY})
    }
}