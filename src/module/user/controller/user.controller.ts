import { Body, Controller, Logger, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiTags, ApiOperation } from "@nestjs/swagger";
import { UserAuthenticationRequestDto } from "../dto/user-authentication.request.dto";
import { UserService } from "../service/user.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { IsPublic } from "src/metadata/is-public.metadata";

@Controller('user')
@ApiTags('user')
export class UserController {

    private readonly logger = new Logger(UserController.name);

    constructor(private readonly userService: UserService) {}

    /* create user, user login, user logout*/
    @IsPublic()
    @ApiOperation({summary: "create user"})
    @ApiBody({type: UserAuthenticationRequestDto})
    @Post()
    public async create(@Body() requestDto: UserAuthenticationRequestDto):Promise<any> {
        return this.userService.createUser(requestDto);
    }

    @IsPublic()
    @ApiBody({type: UserAuthenticationRequestDto})
    @Post("login")
    public async login(@Body() requestDto: UserAuthenticationRequestDto):Promise<string> {
        return this.userService.login(requestDto);
    }


}