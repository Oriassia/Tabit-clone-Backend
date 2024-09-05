import { Request, Response } from "express";
import { connectDB } from "../config/db";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { IReservation, IRestaurant } from "../types/types";
import { Twilio } from "twilio";

// Add a reservation
export async function addReservation(
  req: Request,
  res: Response
): Promise<void> {
  const {
    tableId,
    restId,
    partySize,
    firstName,
    lastName,
    phoneNumber,
    email,
    notes,
    date,
  } = req.body;
  console.log("adding reservation");

  if (
    !tableId ||
    !restId ||
    !partySize ||
    !firstName ||
    !lastName ||
    !phoneNumber ||
    !email ||
    !date
  ) {
    res.status(400).json({ message: "Missing required fields." });
    return;
  }

  let connection;
  let pool;

  try {
    pool = await connectDB();
    connection = await pool.getConnection();

    // Convert the date string into a Date object
    const reservationDate = new Date(date);
    const startTime = new Date(reservationDate);
    const endTime = new Date(reservationDate);

    // Set the time range (1.5 hours before and after)
    startTime.setHours(startTime.getHours() - 1);
    startTime.setMinutes(startTime.getMinutes() - 30);

    endTime.setHours(endTime.getHours() + 1);
    endTime.setMinutes(endTime.getMinutes() + 30);

    // Check if there's any overlapping reservation on this table
    const [existingReservations]: [RowDataPacket[], any] =
      await connection.query(
        `SELECT * FROM Reservations 
       WHERE tableId = ? 
       AND restId = ?
       AND (date > ? AND date < ?)`,
        [tableId, restId, startTime, endTime]
      );

    if (existingReservations.length > 0) {
      res.status(409).json({
        message: "Reservation conflicts with an existing reservation.",
      });
      return;
    }

    // Insert the new reservation
    const [result]: [ResultSetHeader, any] = await connection.query(
      `INSERT INTO Reservations (tableId, restId, partySize, firstName, lastName, phoneNumber, email, notes, date) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        tableId,
        restId,
        partySize,
        firstName,
        lastName,
        phoneNumber,
        email,
        notes,
        reservationDate, // Pass the formatted date
      ]
    );

    const reservationId = result.insertId;

    // Fetch the restaurant details
    const [restaurantRows]: [RowDataPacket[], any] = await connection.query(
      `SELECT * FROM Restaurants WHERE restId = ?`,
      [restId]
    );

    if (!restaurantRows || restaurantRows.length === 0) {
      res.status(404).json({ message: "Restaurant not found." });
      return;
    }

    const restaurant: IRestaurant = restaurantRows[0] as IRestaurant;

    const reservation: IReservation = {
      reservationId,
      tableId,
      restId,
      partySize,
      firstName,
      lastName,
      phoneNumber,
      email,
      date: reservationDate,
      notes,
    };
    // sendSMS(reservation, restaurant);
    res.status(201).json({
      message: "Reservation created successfully",
      reservationId: reservationId,
    });
  } catch (error: any) {
    console.error("Error adding reservation:", error);

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

function sendSMS(reservation: IReservation, restaurant: IRestaurant) {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER } = process.env;

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_NUMBER) {
    console.error("Twilio credentials are missing.");
    throw new Error("Twilio credentials are not properly configured.");
  }

  const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  client.messages
    .create({
      body: `Hello ${reservation.firstName}, 
        Your reservation at ${restaurant.name} on ${reservation.date} for ${reservation.partySize} guests has been confirmed.
        Please inform us if there are any changes.
        Your table will be held for 15 minutes after the reserved time.
        
        For more information, visit: https://localhost:5173/${reservation.reservationId}
      `,
      to: reservation.phoneNumber,
      from: TWILIO_NUMBER,
    })
    .then((message) => console.log(`Message sent: ${message.sid}`))
    .catch((error) => console.error(`Error sending message: ${error.message}`));
}

// Get reservations by restaurant ID and date
export async function getReservationByRestaurantIdAndDate(
  req: Request,
  res: Response
): Promise<void> {
  const { restId, date } = req.query;

  if (!restId || !date) {
    res.status(400).json({ message: "Missing restaurant ID or date." });
    return;
  }

  let connection;

  try {
    const pool = await connectDB();
    connection = await pool.getConnection();

    // Query reservations by restaurant ID and date
    const [rows]: [RowDataPacket[], any] = await connection.query(
      `SELECT * FROM Reservations WHERE restId = ? AND DATE(date) = DATE(?)`,
      [restId, date]
    );

    if (!rows || rows.length === 0) {
      res.status(404).json({
        message: "No reservations found for the specified restaurant and date.",
      });
      return;
    }

    res.status(200).json(rows);
  } catch (error: any) {
    console.error("Error fetching reservations:", error);

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

// Edit a reservation
export async function editReservation(
  req: Request,
  res: Response
): Promise<void> {
  const { oldReservation, newDate, newPosition, newPartySize } = req.body;

  if (!oldReservation || !newDate || !newPosition || !newPartySize) {
    res.status(400).json({ message: "Missing required fields." });
    return;
  }

  const { reservationId, restId } = oldReservation;

  let connection;

  try {
    const pool = await connectDB();
    connection = await pool.getConnection();

    // Call the stored procedure to find an available table and update the reservation
    const [result]: [ResultSetHeader, any] = await connection.query(
      `CALL edit_reservation(?, ?, ?, ?, ?)`,
      [reservationId, restId, newDate, newPosition, newPartySize]
    );

    res.status(200).json({ message: "Reservation updated successfully." });
  } catch (error: any) {
    console.error("Error editing reservation:", error);

    if (error.code === "ER_CON_COUNT_ERROR") {
      console.error("Too many connections to the database.");
    } else if (error.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    } else if (error.code === "ETIMEDOUT") {
      console.error("Connection to the database timed out.");
    } else if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.error("Access denied for the database user.");
    }

    if (error.code === "45000") {
      res.status(400).json({ message: error.sqlMessage });
    } else {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  } finally {
    if (connection) connection.release();
  }
}

// Delete a reservation

export async function deleteReservation(
  req: Request,
  res: Response
): Promise<void> {
  const { reservationId } = req.params;

  if (!reservationId) {
    console.error("Missing reservation ID.");
    res.status(400).json({ message: "Missing reservation ID." });
    return;
  }

  let connection;

  try {
    console.log("Attempting to connect to the database...");
    const pool = await connectDB();
    connection = await pool.getConnection();
    console.log("Database connection established.");

    // Delete the reservation by ID
    console.log(`Executing query to delete reservation ID: ${reservationId}`);
    const [result]: [ResultSetHeader, any] = await connection.query(
      `DELETE FROM Reservations WHERE reservationId = ?`,
      [reservationId]
    );

    if (result.affectedRows === 0) {
      console.log("No reservation found with the provided ID.");
      res.status(404).json({ message: "Reservation not found." });
      return;
    }

    console.log("Reservation deleted successfully.");
    res.status(200).json({ message: "Reservation deleted successfully." });
  } catch (error: any) {
    console.error("Error deleting reservation:", error);

    // Check if the error is related to MySQL connection issues
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
    if (connection) {
      console.log("Releasing database connection.");
      connection.release();
    }
  }
}

export async function getReservationById(
  req: Request,
  res: Response
): Promise<void> {
  let connection;
  const { reservationId } = req.params; // Get reservation ID from request parameters

  try {
    const pool = await connectDB(); // Connect to the database
    connection = await pool.getConnection(); // Get a connection from the pool

    // Execute the stored procedure
    const [rows]: [RowDataPacket[], any] = await connection.query(
      `CALL get_reservation_by_id(?)`,
      [reservationId]
    );

    // Check if any result is returned
    if (!rows || rows.length === 0 || rows[0].length === 0) {
      res.status(404).json({ message: "Reservation not found." });
      return;
    }

    // Return the fetched reservation data
    res.status(200).json(rows[0][0]); // rows[0][0] because it's a stored procedure
  } catch (error: any) {
    console.error("Error fetching reservation:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
}
