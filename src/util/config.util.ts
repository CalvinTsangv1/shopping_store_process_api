import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

class ConfigUtil {
    private readonly logger = new Logger(ConfigUtil.name);
    private readonly configService = new ConfigService();
}