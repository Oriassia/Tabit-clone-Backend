import { Request, Response } from "express";
import { connectDB } from "../config/db";
import { OkPacket, RowDataPacket } from "mysql2";

export async function redeemGiftcard(
  req: Request,
  res: Response
): Promise<void> {
  const { cardId } = req.params;

  if (!cardId) {
    res.status(400).json({ message: "Missing card ID" });
    return;
  }

  let connection;

  try {
    const pool = await connectDB();
    connection = await pool.getConnection();

    // Execute the DELETE query to redeem the gift card
    const [result]: [OkPacket, any] = await connection.query(
      `DELETE FROM Giftcards WHERE cardId = ?`,
      [cardId]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Gift card not found" });
      return;
    }

    res.status(200).json({ message: "Card redeemed successfully" });
  } catch (error: any) {
    console.error("Error redeeming card:", error);

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
export async function createGiftcard(
  req: Request,
  res: Response
): Promise<void> {
  const {
    restId,
    firstName,
    lastName,
    phoneNumber,
    email,
    balance,
    senderName,
  } = req.body;

  // Validate required fields
  if (
    !restId ||
    !firstName ||
    !lastName ||
    (!phoneNumber && !email) ||
    !balance ||
    !senderName
  ) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  let connection;

  try {
    const pool = await connectDB();
    connection = await pool.getConnection();

    // Call the stored procedure directly to create a new gift card
    const [result]: [OkPacket, any] = await connection.query(
      `CALL InsertGiftCard(?, ?, ?, ?, ?, ?, ?)`,
      [restId, firstName, lastName, phoneNumber, email, balance, senderName]
    );

    res.status(201).json({
      message: "Gift card created successfully",
      cardId: result.insertId,
    });
  } catch (error: any) {
    console.error("Error creating gift card:", error);

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

export async function getCardById(req: Request, res: Response): Promise<void> {
  const { cardId } = req.params;

  if (!cardId) {
    res.status(400).json({ message: "Missing card ID" });
    return;
  }

  let connection;

  try {
    const pool = await connectDB();
    connection = await pool.getConnection();

    // Call the stored procedure to get the card by ID
    const [rows]: [RowDataPacket[], any] = await connection.query(
      `CALL getCardById(?)`,
      [cardId]
    );

    if (!rows[0] || rows[0].length === 0) {
      res.status(404).json({ message: "Card not found." });
      return;
    }

    res.status(200).json(rows[0][0]); // The stored procedure returns a result set in an array
  } catch (error: any) {
    console.error("Error fetching card by ID:", error);

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
