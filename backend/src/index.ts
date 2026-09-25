import dotenv from 'dotenv';
import app from "./app.js";
import Database from './config/database.js';
import Env from './config/env.js';

const startServer = async (): Promise<void> => {
    try {
        await Database.connect();
        app.listen(Env.PORT, async () => {
            await Database.connect();
            console.log(`Server running on port ${Env.PORT}`);
        });
    } catch (error) {
        console.error('Failed to start application:', error);
        process.exit(1);
    }
};


startServer();