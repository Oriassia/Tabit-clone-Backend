import { Twilio } from "twilio";
import Restaurant from "../models/Resturant.model";
import { IReservation, IRestaurant, ITable } from "../types/types";
import { Request, Response } from "express";

interface IEditRequest extends Request {
  params: {
    restaurantId: string;
    oldTableId: string;
    oldReservationId: string;
  };
  body: ITable;
}

interface IAddReservationRequest extends Request {
  params: {
    restaurantId: string;
  };
  body: ITable;
}

interface IGetReservation extends Request {
  params: {
    restaurantId: string;
    tableId: string;
    reservationId: string;
  };
}

interface IDeleteReservationRequest extends Request {
  params: {
    restaurantId: string;
    reservationId: string;
  };
  body: ITable;
}

export async function addReservation(
  req: IAddReservationRequest,
  res: Response
): Promise<void> {
  try {
    const { restaurantId } = req.params;
    const updatedTable = req.body;

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }

    const tableIndex = restaurant.tables.findIndex(
      (table) => table._id == updatedTable._id
    );

    if (tableIndex === -1) {
      res.status(404).json({ message: "Table not found" });
      return;
    }

    restaurant.tables[tableIndex] = updatedTable;
    const reservation =
      updatedTable.reservations[updatedTable.reservations.length - 1];
    await restaurant.save();
    // sendSMS(reservation, restaurant);  will add only on production when link is fixed!
    res.status(201).json({
      message: "Reservation added successfully",
      reservation: reservation,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "An unexpected error occurred", error: error.message });
  }
}

function sendSMS(reservation: IReservation, restaurant: IRestaurant) {
  const { accountSid, authToken, number } = process.env;

  const client = new Twilio(accountSid, authToken);

  client.messages
    .create({
      body: `Hello ${reservation.guestInfo.guestFirstName}, 
      Your reservation at ${restaurant.name} on ${reservation.reservationTime} for ${reservation.partySize} guests has been confirmed.
      Please inform us if there are any changes.
      Your table will be held for 15 minutes after the reserved time.
      
      For more information, visit: https://localhost:5173/${reservation._id}
      `, // Message body

      to: reservation.guestInfo.phoneNumber, // The recipient phone number (e.g., your phone number)
      from: number, // Your Twilio phone number (get it from Twilio Console)
    })
    .then((message) => console.log(`Message sent: ${message.sid}`))
    .catch((error) => console.error(`Error sending message: ${error.message}`));
}

export async function deleteReservation(
  req: IDeleteReservationRequest,
  res: Response
): Promise<void> {
  try {
    const { restaurantId, reservationId } = req.params;
    const table = req.body;

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }

    if (!table) {
      res.status(404).json({ message: "Table not found" });
      return;
    }

    const reservationIndex = table.reservations.findIndex(
      (reservation) => reservation._id === reservationId
    );

    if (reservationIndex === -1) {
      res.status(404).json({ message: "Reservation not found" });
      return;
    }

    table.reservations.splice(reservationIndex, 1);
    await restaurant.save();

    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function editReservation(req: IEditRequest, res: Response) {
  try {
    const {
      restaurantId,
      oldTableId,
      oldReservationId: reservationId,
    } = req.params;
    const updatedTable = req.body;

    // Find the restaurant
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Find the table to update
    const tableIndex = restaurant.tables.findIndex(
      (table) => table._id == updatedTable._id
    );
    if (tableIndex === -1) {
      return res.status(404).json({ message: "Table not found" });
    }

    // Update the table with the new information
    restaurant.tables[tableIndex] = updatedTable;

    // Find the new reservation in the updated table
    const newReservation =
      updatedTable.reservations[updatedTable.reservations.length - 1];

    if (!newReservation) {
      return res.status(400).json({ message: "New reservation not found" });
    }

    // Find the old table and reservation to delete
    const oldTableIndex = restaurant.tables.findIndex(
      (table) => table._id == oldTableId
    );

    if (oldTableIndex === -1) {
      return res.status(404).json({ message: "Old table not found" });
    }

    // Find the old reservation within the old table
    const oldReservationIndex = restaurant.tables[
      oldTableIndex
    ].reservations.findIndex((reservation) => reservation._id == reservationId);

    if (oldReservationIndex === -1) {
      return res.status(404).json({ message: "Old reservation not found" });
    }

    // Remove the old reservation
    restaurant.tables[oldTableIndex].reservations.splice(
      oldReservationIndex,
      1
    );

    // Save the changes to the restaurant
    await restaurant.save();

    // Return success response
    res
      .status(200)
      .json({ message: "Reservation edited successfully", newReservation });
  } catch (error: any) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function getReservation(req: IGetReservation, res: Response) {
  try {
    const { restaurantId, tableId, reservationId } = req.params;

    // Find the restaurant by ID
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Find the table by ID
    const table = restaurant.tables.find((table) => table._id == tableId);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    // Find the reservation by ID
    const reservation = table.reservations.find(
      (reservation) => reservation._id == reservationId
    );
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // Return the found reservation and restaurant data
    return res.status(200).json({
      reservation: reservation,
      restaurant: restaurant,
    });
  } catch (error: any) {
    // Handle any errors that occur
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
}
