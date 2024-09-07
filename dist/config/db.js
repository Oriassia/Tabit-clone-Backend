"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const promise_1 = require("mysql2/promise");
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path")); // Useful for resolving the file path
dotenv_1.default.config();
let pool;
const connectDB = async () => {
    if (!pool) {
        try {
            console.log("Initializing connection pool...");
            // Ensure DB_SSL_CA_PATH is set
            const caCertPath = process.env.DB_SSL_CA_PATH;
            if (!caCertPath) {
                console.error("CA certificate path is not defined in the environment variables.");
                throw new Error("CA certificate path is not defined in the environment variables.");
            }
            // Ensure the file exists and can be read
            const caCert = fs_1.default.readFileSync(path_1.default.resolve(caCertPath));
            console.log("Creating MySQL connection pool...");
            // Create a connection to the database using mysql2/promise
            pool = await (0, promise_1.createPool)({
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                database: "defaultdb",
                waitForConnections: true,
                connectionLimit: 100,
                queueLimit: 0,
                connectTimeout: 60000, // 60 seconds for connection timeout
                ssl: {
                    rejectUnauthorized: true,
                    ca: caCert.toString(),
                },
            });
        }
        catch (error) {
            console.error("Error during MySQL pool initialization:", error.message);
            throw error; // Rethrow the error to be caught by the caller
        }
    }
    else {
        console.log("Reusing existing MySQL connection pool.");
    }
    console.log("Returning MySQL connection pool.");
    return pool;
};
exports.connectDB = connectDB;
