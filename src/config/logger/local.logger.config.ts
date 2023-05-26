import winston from "winston";
import {utilities as nestWinstonModuleUtilities} from "nest-winston/dist/winston.utilities";
import {WinstonModuleOptionsFactory} from "nest-winston";
import {WinstonModuleOptions} from "nest-winston/dist/winston.interfaces";
import {Injectable} from "@nestjs/common";

@Injectable()
export class LocalLoggerConfig implements WinstonModuleOptionsFactory {

    createWinstonModuleOptions(): Promise<WinstonModuleOptions> | WinstonModuleOptions {
        return {
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        nestWinstonModuleUtilities.format.nestLike(),
                    )
                })
            ]
        }
    }

}
