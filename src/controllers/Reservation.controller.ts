import { Request, Response } from "express";
import { connectDB } from "../config/db";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { IReservation, IRestaurant } from "../types/types";
import { Twilio } from "twilio";
import nodemailer from "nodemailer";
import moment from "moment-timezone"; // Import moment-timezone for timezone handling
// Add a reservation
export const convertISOToSQLDateTime = (isoString: string) => {
  if (typeof isoString === "string" && isoString.endsWith("Z")) {
    // Parse the ISO string to a Date object in UTC
    const date = new Date(isoString);

    // Extract components in UTC
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    // Format to 'YYYY-MM-DD HH:MM:SS'
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  } else {
    console.error("Invalid ISO format:", isoString);
    return null; // Return null if the format is invalid
  }
};
export const parseCustomDateTime = (dateTimeString: string) => {
  // Check if the string matches the expected format
  if (
    typeof dateTimeString === "string" &&
    /^\d{2}-\d{2}-\d{4}T\d{2}:\d{2}$/.test(dateTimeString)
  ) {
    const [datePart, timePart] = dateTimeString.split("T");
    const [day, month, year] = datePart.split("-").map(Number);
    const [hours, minutes] = timePart.split(":").map(Number);

    // Create a new Date object with the parsed values
    return new Date(year, month - 1, day, hours, minutes);
  } else {
    console.error("Invalid date format:", dateTimeString);
    return null; // Return null if the format is invalid
  }
};

export async function sendReservationEmail(
  reservation: IReservation,
  restaurant: IRestaurant
): Promise<void> {
  console.log("executing Email...");

  const { EMAIL, EMAIL_PASSWORD } = process.env;

  if (!EMAIL || !EMAIL_PASSWORD) {
    console.error("Email credentials are missing.");
    throw new Error("Email credentials are not properly configured.");
  }

  try {
    // Create a transporter using SMTP settings
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD,
      },
    });

    // Define the HTML content with styling for a reservation approval
    const htmlContent = `
    <html>
    <head>
    <style>
    body {
      background-color: #212121;
      color: #ffffff;
      font-family: 'BetonEF', Arial, sans-serif;
      padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #333333;
        padding: 20px;
        border-radius: 8px;
        color: #ffffff;
        }
        .header {
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #ffffff;
          }
          .greeting {
          font-size: 18px;
          margin-bottom: 10px;
          color: #ffffff;
        }
        .message {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 20px;
          color: #ffffff;
        }
        .details {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 20px;
          color: #ffffff;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #0ca3a6;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">Reservation Confirmation</div>
        <div class="greeting">Hi ${reservation.firstName} ${
      reservation.lastName
    },</div>
        <div class="message">
        We're excited to confirm your reservation at <strong>${
          restaurant.name
        }</strong>! 
        </div>
        
        <div class="message">
          Here are your reservation details:
          </div>
        <div class="details">
          <p><strong>Date:</strong> ${new Date(reservation.date).toLocaleString(
            "en-US",
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }
          )}</p>
          <p><strong>Party Size:</strong> ${reservation.partySize}</p>
          <p><strong>Notes:</strong> ${reservation.notes || "None"}</p>
        </div>
        <p>Your table will be held for 15 minutes after the reserved time. Please let us know if there are any changes.</p>
        <div style="text-align: center;">
          <a href="https://tabit-clone.vercel.app/online-reservations/reservation-details?reservationId=${
            reservation.reservationId
          }" class="button">View Reservation</a>
        </div>
      </div>
    </body>
    </html>
  `;

    // Define email options
    const mailOptions: nodemailer.SendMailOptions = {
      from: EMAIL,
      to: reservation.email,
      subject: `Your Reservation at ${restaurant.name} - Confirmation`,
      html: htmlContent,
    };

    console.log("Sending Email...");

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error: any) {
    console.error("Error sending reservation email:", error);
    throw new Error(`Failed to send reservation email: ${error.message}`);
  }
}

export async function sendCancelationEmail(
  reservation: IReservation,
  restaurant: IRestaurant
): Promise<void> {
  const { EMAIL, EMAIL_PASSWORD } = process.env;

  if (!EMAIL || !EMAIL_PASSWORD) {
    console.error("Email credentials are missing.");
    throw new Error("Email credentials are not properly configured.");
  }

  try {
    // Create a transporter using SMTP settings
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD,
      },
    });

    // Define the HTML content with styling for a reservation approval
    const htmlContent = `
    <html>
    <head>
      <style>
      body {
        background-color: #212121;
        color: #ffffff;
        font-family: 'BetonEF', Arial, sans-serif;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #333333;
        padding: 20px;
        border-radius: 8px;
        color: #ffffff;
      }
      .header {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
        color: #ffffff;
      }
      .greeting {
        font-size: 18px;
        margin-bottom: 10px;
        color: #ffffff;
      }
      .message {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 20px;
        color: #ffffff;
      }
      .details {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 20px;
        color: #ffffff;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #0ca3a6;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        text-align: center;
      }
      </style>
    </head>
    <body>
      <div class="container">
      <div class="header">Reservation Cancelation</div>
      <div class="greeting">Hi ${reservation.firstName}${
      reservation.lastName
    },</div>
      <div class="message">
        We regret to inform you that your reservation at <strong>${
          restaurant.name
        }</strong> has been canceled. Here are your reservation details:
      </div>
      <div class="details">
        <p><strong>Date:</strong> ${reservation.date}</p>
        <p><strong>Party Size:</strong> ${reservation.partySize}</p>
        <p><strong>Notes:</strong> ${reservation.notes || "None"}</p>
      </div>
      <p>If you have any questions or need further assistance, please contact us.</p>
      </div>
    </body>
    </html>
    `;

    // Define email options
    const mailOptions: nodemailer.SendMailOptions = {
      from: EMAIL,
      to: reservation.email,
      subject: `Your Reservation at ${restaurant.name} - Cancelation`,
      html: htmlContent,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error: any) {
    console.error("Error sending reservation email:", error);
    throw new Error(`Failed to send reservation email: ${error.message}`);
  }
}

export async function addReservation(
  req: Request,
  res: Response
): Promise<void> {
  let {
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
    if (date.indexOf("-") != -1) {
      date = parseCustomDateTime(date);
    }
    const reservationDate = new Date(date);
    const startTime = new Date(reservationDate);
    const endTime = new Date(reservationDate);

    // Set the time range (1.5 hours before and after)
    startTime.setHours(startTime.getHours() - 1);
    startTime.setMinutes(startTime.getMinutes() - 30);

    endTime.setHours(endTime.getHours() + 1);
    endTime.setMinutes(endTime.getMinutes() + 30);

    // Check if there's any overlapping reservation on this table
    console.log("[addReservation-func]-overlapping check:", startTime, endTime);

    const [existingReservations]: [RowDataPacket[], any] =
      await connection.query(
        `SELECT * FROM Reservations 
      WHERE tableId = ? 
      AND restId = ?
      AND (date > ? AND date < ?)`,
        [
          tableId,
          restId,
          convertISOToSQLDateTime(startTime.toISOString()),
          convertISOToSQLDateTime(endTime.toISOString()),
        ]
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
    sendReservationEmail(reservation, restaurant);
    // sendSMS(reservation, restaurant);

    res.status(201).json({
      message: "Reservation created successfully",
      reservationId: reservationId,
      restaurant: restaurant,
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
  const { reservationId, tableId, newPartySize, newDate } = req.body;

  if (!reservationId || !newDate || !tableId || !newPartySize) {
    res.status(400).json({ message: "Missing required fields." });
    return;
  }

  let connection;

  try {
    const pool = await connectDB();
    connection = await pool.getConnection();

    // Call the stored procedure to find an available table and update the reservation
    const [result]: [ResultSetHeader, any] = await connection.query(
      `CALL edit_reservation(?, ?, ?, ?)`,
      [reservationId, tableId, newPartySize, newDate]
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

    const reservationData = rows[0][0]; // Get the first row

    // Fetch the restaurant details
    const [restaurantRows]: [RowDataPacket[], any] = await connection.query(
      `SELECT * FROM Restaurants WHERE restId = ?`,
      [reservationData.restId]
    );

    if (!restaurantRows || restaurantRows.length === 0) {
      res.status(404).json({ message: "Restaurant not found." });
      return;
    }

    const restaurantData: IRestaurant = restaurantRows[0] as IRestaurant;

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

    sendCancelationEmail(reservationData, restaurantData);
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

    const reservation = rows[0][0]; // Get the first row
    console.log("[BE-get-reservation]-date:", reservation.date);
    console.log("[BE-get-reservation]-reservation data:", reservation);

    // Return the fetched reservation data
    res.status(200).json(reservation); // Return the reservation object
  } catch (error: any) {
    console.error("Error fetching reservation:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
}
