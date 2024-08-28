import { Request, Response } from "express";
import { connectDB } from "../config/db";
import { RowDataPacket } from "mysql2/promise";

// Fetch all restaurants
export async function getAllRestaurants(
  req: Request,
  res: Response
): Promise<void> {
  let connection;

  try {
    const pool = await connectDB();
    connection = await pool.getConnection();

    const [rows]: [RowDataPacket[], any] = await connection.query(
      `SELECT * FROM Restaurants`
    );

    if (!rows || rows.length === 0) {
      res.status(404).json({ message: "No restaurants found." });
      return;
    }

    res.status(200).json(rows);
  } catch (error: any) {
    console.error("Error fetching restaurants:", error);

    if (error.code === "ER_CON_COUNT_ERROR") {
      console.error("Too many connections to the database.");
    } else if (error.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    } else if (error.code === "ETIMEDOUT") {
      console.error("Connection to the database timed out.");
    } else if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.error("Access denied for the database user.");
    }

    res.status(500).json({ message: "Server error", error: error.message });
  } finally {
    if (connection) connection.release();
  }
}
export async function getPhotosByRestId(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;
  let connection;

  try {
    const pool = await connectDB();
    connection = await pool.getConnection();

    const [rows]: [RowDataPacket[], any] = await connection.query(
      `SELECT * FROM RestaurantsPhotos WHERE restId =?`,
      [id]
    );

    if (!rows || rows.length === 0) {
      res.status(404).json({ message: "Restaurant not found." });
      return;
    }

    res.status(200).json(rows[0]);
  } catch (error: any) {
    console.error("Error fetching restaurant:", error);

    if (error.code === "ER_CON_COUNT_ERROR") {
      console.error("Too many connections to the database.");
    } else if (error.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    } else if (error.code === "ETIMEDOUT") {
      console.error("Connection to the database timed out.");
    } else if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.error("Access denied for the database user.");
    }

    res.status(500).json({ message: "Server error", error: error.message });
  } finally {
    if (connection) connection.release();
  }
}

export async function getAvaliableTablesForNow(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;
  let connection;

  try {
    const pool = await connectDB();
    connection = await pool.getConnection();

    const [rows]: [RowDataPacket[], any] = await connection.query(
      `call GetAvailableTablesByNow(?)`,
      [id]
    );

    if (!rows || rows.length === 0) {
      res.status(404).json({ message: "Restaurant not found." });
      return;
    }

    res.status(200).json(rows[0]);
  } catch (error: any) {
    console.error("Error fetching restaurant:", error);

    if (error.code === "ER_CON_COUNT_ERROR") {
      console.error("Too many connections to the database.");
    } else if (error.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    } else if (error.code === "ETIMEDOUT") {
      console.error("Connection to the database timed out.");
    } else if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.error("Access denied for the database user.");
    }

    res.status(500).json({ message: "Server error", error: error.message });
  } finally {
    if (connection) connection.release();
  }
}
// Fetch a single restaurant by ID
export async function getRestaurantById(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;
  let connection;

  try {
    const pool = await connectDB();
    connection = await pool.getConnection();

    const [rows]: [RowDataPacket[], any] = await connection.query(
      `SELECT * 
        FROM Restaurants r 
        INNER JOIN OpeningHours o ON r.restId = o.restId inner join RestaurantMenus M on r.restId = M.restId
        WHERE r.restId = ?`,
      [id]
    );

    if (!rows || rows.length === 0) {
      res.status(404).json({ message: "Restaurant not found." });
      return;
    }

    res.status(200).json(rows[0]);
  } catch (error: any) {
    console.error("Error fetching restaurant:", error);

    if (error.code === "ER_CON_COUNT_ERROR") {
      console.error("Too many connections to the database.");
    } else if (error.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    } else if (error.code === "ETIMEDOUT") {
      console.error("Connection to the database timed out.");
    } else if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.error("Access denied for the database user.");
    }

    res.status(500).json({ message: "Server error", error: error.message });
  } finally {
    if (connection) connection.release();
  }
}

// Get available tables nearby based on location and time
export async function getAvailableTables(
  req: Request,
  res: Response
): Promise<void> {
  const { lat, lng, date, partySize } = req.body;

  if (!lat || !lng || !date) {
    res.status(400).json({ message: "Missing latitude, longitude, or date." });
    return;
  }

  let connection;

  try {
    const pool = await connectDB();
    connection = await pool.getConnection();

    // Call the stored procedure to get available tables nearby
    const [rows]: [RowDataPacket[], any] = await connection.query(
      `CALL get_available_tables_nearby(?, ?, ?, ?)`,
      [lat, lng, date, partySize]
    );

    if (!rows || rows.length === 0) {
      res.status(404).json({ message: "No available tables found." });
      return;
    }

    res.status(200).json(rows);
  } catch (error: any) {
    console.error("Error fetching available tables:", error);

    if (error.code === "ER_CON_COUNT_ERROR") {
      console.error("Too many connections to the database.");
    } else if (error.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    } else if (error.code === "ETIMEDOUT") {
      console.error("Connection to the database timed out.");
    } else if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.error("Access denied for the database user.");
    }

    res.status(500).json({ message: "Server error", error: error.message });
  } finally {
    if (connection) connection.release();
  }
}
