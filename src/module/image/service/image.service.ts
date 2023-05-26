import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserEntity } from "src/module/user/entity/user.entity";
import fs from 'fs';

@Injectable()
export class ImageService {

    private readonly logger = new Logger(ImageService.name);

    constructor(@InjectModel(UserEntity.name) private userModel: Model<UserEntity>) {}

    public async uploadAvatar(username: string, file: Express.Multer.File): Promise<boolean> {
        await this.userModel.updateOne({username:username}, {avatar: file.buffer.toString('base64')})
        console.log('updated avatar')
        return true;
    }

    public async getAvatar(username: string): Promise<string> {
        return await this.userModel.findOne({username: username}).then((result) => result.avatar)
    }
}