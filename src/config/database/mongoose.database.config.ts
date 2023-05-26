import { Injectable } from "@nestjs/common";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";
import MongoUtil from "../../util/mongo.util";

@Injectable()
export class MongooseDatabaseConfig implements MongooseOptionsFactory {

    constructor() {}

    createMongooseOptions(): MongooseModuleOptions {
        return {
            uri: MongoUtil.getMongodbUrl(),
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
}