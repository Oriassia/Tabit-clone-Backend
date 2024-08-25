import { Twilio } from "twilio";
import Restaurant from "../models/Resturant.model";
import { IReservation, IRestaurant, ITable } from "../types/types";
import { Request, Response } from "express";

interface Location {
  lat: number;
  lng: number;
}

interface IAddReservationRequest extends Request {
  params: {
    restaurantId: string;
  };
  body: ITable;
}

interface IDeleteReservationRequest extends Request {
  params: {
    restaurantId: string;
    reservationId: string;
  };
  body: ITable;
}

export async function addEditReservation(
  req: IAddReservationRequest,
  res: Response
): Promise<void> {
  try {
    const { restaurantId } = req.params;
    const newTable = req.body;

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }

    const tableIndex = restaurant.tables.findIndex(
      (table) => table._id === newTable._id
    );

    if (tableIndex === -1) {
      res.status(404).json({ message: "Table not found" });
      return;
    }

    restaurant.tables[tableIndex] = newTable;
    const reservation = newTable.reservations[newTable.reservations.length - 1];
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
