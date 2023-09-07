import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import ENV from '../config.js';

async function connect() {
    try {
        const mongod = await MongoMemoryServer.create();
        const getUri = mongod.getUri();

        mongoose.set('strictQuery', true);

        const db = await mongoose.connect(ENV.ATLAS_URI || getUri);
        console.log("Database Connected");
        return db;
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw error;
    }
}

export default connect;
