import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./controller/user.controller";
import { UserService } from "./service/user.service";
import { UserEntity, UserSchema } from "./entity/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { JwtAuthConfig } from "src/config/authentication/jwt.auth.config";
import { PermissionEntity, PermissionSchema } from "./entity/permission.entity";

@Module({
    imports:[
        MongooseModule.forFeature([{name: UserEntity.name, schema: UserSchema}, {name: PermissionEntity.name, schema: PermissionSchema}]),
        JwtModule.registerAsync({useClass: JwtAuthConfig})
    ],
    controllers: [UserController],
    providers: [UserService],
})

export class UserModule {}