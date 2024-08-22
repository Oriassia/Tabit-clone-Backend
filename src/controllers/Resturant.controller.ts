import mongoose from "mongoose";
import Restaurant from "../models/Resturant.model";
import { IReservation } from "../types/types";
import { Request, Response } from "express";
import * as moment from 'moment-timezone';

interface Location {
  lat: number;
  lng: number;
}

interface IRequest extends Request {
  body: {
    location: Location;
  };
  query: {
    guests: string;
    date: string;
    page?: string;
  };
}

interface IAddReservationRequest extends Request {
  params: {
    restaurantId: string;
  };
  body: IReservation;
}

export async function addReservation(req: IAddReservationRequest, res: Response): Promise<void> {
  try {
    const { restaurantId } = req.params;
    const newReservation = req.body;

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      res.status(404).json({ message: 'Restaurant not found' });
      return;
    }

    const table = restaurant.tables.find(table => table.position === newReservation.position);

    if (!table) {
      res.status(400).json({ message: 'Table position not found in this restaurant' });
      return;
    }

    table.reservations.push(newReservation);

    await restaurant.save();

    res.status(201).json({ message: 'Reservation added successfully', reservation: newReservation });
  } catch (error: any) {
    res.status(500).json({ message: 'An unexpected error occurred', error: error.message });
  }
}


export async function getAllRestaurants(req: Request, res: Response): Promise<void> {
  try {
    const restaurants = await Restaurant.find(); // Fetch all restaurants

    if (!restaurants || restaurants.length === 0) {
      res.status(404).json({ message: 'No restaurants found' });
      return;
    }

    res.status(200).json(restaurants);
  } catch (error: any) {
    if (error instanceof mongoose.Error) {
      res.status(400).json({ message: 'Database query failed', error: error.message });
    } else {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}

export async function getRestaurantById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findById(id); // Find restaurant by ID

    if (!restaurant) {
      res.status(404).json({ message: 'Restaurant not found' });
      return;
    }

    res.status(200).json(restaurant);
  } catch (error: any) {
    if (error instanceof mongoose.Error) {
      res.status(400).json({ message: 'Database query failed', error: error.message });
    } else {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}


export const get25RestaurantsNearLocation = async (
  req: IRequest,
  res: Response
) => {
  const { location } = req.body;
  const { lat, lng } = location;
  const { guests, date, page = "1" } = req.query; // Ensure page is a string

  try {
    if (!lat || !lng || !guests || !date) {
      return res.status(400).json({ message: "Invalid parameters." });
    }

    const guestsNum = parseInt(guests);
    const requestedTime = new Date(date);

    if (isNaN(guestsNum) || isNaN(requestedTime.getTime())) {
      return res
        .status(400)
        .json({ message: "Invalid guests or date format." });
    }

    // Calculate the time windows: 1.5 hours before and after
    const minTime = new Date(requestedTime.getTime() - 1.5 * 60 * 60 * 1000);
    const maxTime = new Date(requestedTime.getTime() + 1.5 * 60 * 60 * 1000);

    // Pagination
    const pageSize = 25;
    const currentPage = parseInt(page); // Ensure page is an integer
    const skip = (currentPage - 1) * pageSize;

    // Query to find restaurants near the location
    const restaurants = await Restaurant.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [lng, lat],
          },
          distanceField: "distance",
          maxDistance: 10000, // Adjust max distance as needed (in meters)
          spherical: true,
        },
      },
      {
        $match: {
          // Filter by available tables
          "tables.reservations": {
            $not: {
              $elemMatch: {
                $or: [
                  {
                    reservationTime: {
                      $gte: minTime,
                      $lte: maxTime,
                    },
                  },
                ],
              },
            },
          },
          "tables.partySize": { $gte: guestsNum },
        },
      },
      { $skip: skip },
      { $limit: pageSize },
    ]);

    if (!restaurants.length) {
      return res
        .status(404)
        .json({ message: "No restaurants found with available tables." });
    }

    res.json({ restaurants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};
