import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { ConfigModule, registerAs } from "@nestjs/config";
import { WinstonModule } from "nest-winston";
import { LocalLoggerConfig } from "src/config/logger/local.logger.config";
import { MongooseModule } from "@nestjs/mongoose";
import { MongooseDatabaseConfig } from "src/config/database/mongoose.database.config";
import { JwtModule } from "@nestjs/jwt";
import { ImageModule } from "./image/image.module";

@Module({
    imports:[
        ConfigModule.forRoot({
            isGlobal: true
        }),
        WinstonModule.forRootAsync({
            useClass: (() =>  LocalLoggerConfig)()
        }),
        MongooseModule.forRootAsync({
            useClass: MongooseDatabaseConfig
        }),
        UserModule,
        ImageModule,
    ]
})

export class AppModule {}