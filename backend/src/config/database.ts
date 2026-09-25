import mongoose from "mongoose";
import Env from "./env.js";
import DatabaseConnectionError from "../errors/database-connection-error.js";


export default class Database {
    private static isConnected = false;

    public static async connect(): Promise<void> {
        if (Database.isConnected) {
            console.log('Database already connected');
            return;
        }

        const databaseUri = Env.DATABASE_URI;

        if (!databaseUri) {
            throw new DatabaseConnectionError();
        }

        try {
            const connection = await mongoose.connect(databaseUri);

            Database.isConnected = connection.connection.readyState === 1;

            console.log(`MongoDB connected: ${connection.connection.host}`);
        } catch (error) {
            console.error('MongoDB connection failed:', error);
            throw error;
        }
    }

    public static async disconnect(): Promise<void> {
        if (!Database.isConnected) {
            return;
        }

        await mongoose.disconnect();

        Database.isConnected = false;

        console.log('MongoDB disconnected');
    }

}