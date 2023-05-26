import fs from 'fs';
import { MongoClient } from 'mongodb';
import {Logger} from "@nestjs/common";

class MongoUtil {
    private readonly logger = new Logger(MongoUtil.name);
    private mongodbUrl: string;
    private mongodbKeyDb: string;
    private mongodbKeyCollection: string;
    private schemaMap = {};

    getMongodbUrl() {
        return this.mongodbUrl;
    }

    getSchemaMap() {
        return this.schemaMap;
    }


    async init() {
        this.logger.log(`Mongo util initialing...`);

        this.mongodbUrl = process.env.MONGODB_URL;
        this.logger.log(`Connecting to mongodb(unencrypted client)...`);
        const unencryptedClient = await new MongoClient(this.mongodbUrl).connect();
        const databaseName = unencryptedClient.db().databaseName;

        this.logger.log(`Mongo util initialed: ${databaseName}`);
    }
}

export default new MongoUtil()
