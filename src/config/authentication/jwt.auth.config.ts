import {Injectable} from "@nestjs/common";
import {JwtModuleOptions, JwtOptionsFactory} from "@nestjs/jwt/dist/interfaces/jwt-module-options.interface";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class JwtAuthConfig implements JwtOptionsFactory {

    constructor(private readonly configService: ConfigService) {

    }

    createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
        return {}
    }

}
