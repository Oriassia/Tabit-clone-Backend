import { createPool, Pool } from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";
import path from "path"; // Useful for resolving the file path

dotenv.config();

let pool: Pool;

export const connectDB = async (): Promise<Pool> => {
  if (!pool) {
    try {
      console.log("Initializing connection pool...");

      console.log("Creating MySQL connection pool...");
      // Create a connection to the database using mysql2/promise
      pool = await createPool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: "defaultdb",
        waitForConnections: true,
        connectionLimit: 10, // Lower limit for serverless environments
        queueLimit: 0,
        connectTimeout: 60000,
        ssl: {
          rejectUnauthorized: true,
          ca: process.env.DB_SSL_CA, // Use environment variable directly
        },
      });
    } catch (error: any) {
      console.error("Error during MySQL pool initialization:", error.message);
      throw error; // Rethrow the error to be caught by the caller
    }
  } else {
    console.log("Reusing existing MySQL connection pool.");
  }

  console.log("Returning MySQL connection pool.");
  return pool;
};
