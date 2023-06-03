import { Controller, Logger, Post, Get, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../../metadata/roles.metadata";
import { ImageService } from "../service/image.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { RoleTypeEnum } from "src/module/user/enum/role-type.enum";
import { CurrentUser } from "src/decorator/current-user.decorator";
import { JwtModel } from "src/model/jwt.model";

@ApiBearerAuth()
@Controller('image')
@ApiTags('process image')
export class ImageController {
    private readonly logger = new Logger(ImageController.name);

    constructor(private readonly imageService: ImageService) {}

    @ApiOperation({summary: "upload image"})
    @Roles(RoleTypeEnum.ADMIN, RoleTypeEnum.STAFF)
    @Post()
    @UseInterceptors(FileInterceptor('photo'))
    public async upload(@CurrentUser() user: JwtModel, @UploadedFile() file: Express.Multer.File):Promise<any> {
        return this.imageService.uploadAvatar(user.username, file);
    }

    @ApiOperation({summary: "get image"})
    @Roles(RoleTypeEnum.ADMIN, RoleTypeEnum.STAFF)
    @Get()
    public async getImage(@CurrentUser() user: JwtModel):Promise<any> {
        return this.imageService.getAvatar(user.username);
    }
}