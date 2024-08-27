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

      // Ensure DB_SSL_CA_PATH is set
      const caCertPath = process.env.DB_SSL_CA_PATH;
      if (!caCertPath) {
        console.error(
          "CA certificate path is not defined in the environment variables."
        );
        throw new Error(
          "CA certificate path is not defined in the environment variables."
        );
      }

      // Ensure the file exists and can be read

      const caCert = fs.readFileSync(path.resolve(caCertPath));

      console.log("Creating MySQL connection pool...");
      // Create a connection to the database using mysql2/promise
      pool = await createPool({
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
