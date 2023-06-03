import { ClassSerializerInterceptor, Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { json } from "express";
import MongoUtil from "./util/mongo.util";
import { AppModule } from "./module/app.module";
import { ConfigService } from "@nestjs/config";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { JwtService } from "@nestjs/jwt";
import { AuthorizationGuard } from "./guard/authorization.guard";
import { RolesGuard } from "./guard/roles.guard";
import { PermissionsGuard } from "./guard/permissions.guard";


async function main() {
    await MongoUtil.init();

    const app = await NestFactory.create(AppModule, {
        cors: true
    });

    const testAddon = require('../build/Release/testaddon');
    console.log(testAddon);
    module.exports = testAddon.ConvertImageFileFormat("test.jpg", "png");

    const reflector = app.get(Reflector);
    const configService = app.get<ConfigService>(ConfigService);
    const jwtService = app.get<JwtService>(JwtService);
    const serviceName = configService.get<string>("SHOPPING_STORE_PROCESS_API_NAME");
    const servicePort = configService.get<number>("SHOPPING_STORE_PROCESS_API_PORT");
    const serviceVersion = configService.get<string>("npm_package_version");
    const options = new DocumentBuilder().addBearerAuth().setTitle(serviceName).setVersion(serviceVersion).build();
    SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, options));
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
    app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: false }));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
    app.useGlobalGuards(new AuthorizationGuard(reflector, jwtService), new RolesGuard(reflector), new PermissionsGuard(reflector))
    app.useGlobalFilters();
    app.use(json({limit: "10mb"}));

    app.listen(servicePort, () => {
        console.info(`Application ${serviceName}:${serviceVersion} running on port ${servicePort}`);
    });
}


main();
