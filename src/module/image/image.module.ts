
import { JwtModule } from "@nestjs/jwt";
import { JwtAuthConfig } from "src/config/authentication/jwt.auth.config";
import { ImageController } from "./controller/image.controller";
import { ImageService } from "./service/image.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { UserEntity, UserSchema } from "../user/entity/user.entity";

@Module({
    imports:[
        MongooseModule.forFeature([{name: UserEntity.name, schema: UserSchema}]),
        JwtModule.registerAsync({useClass: JwtAuthConfig})
    ],
    controllers: [ImageController],
    providers: [ImageService],
})

export class ImageModule {}