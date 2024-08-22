import mongoose from "mongoose";
import Restaurant from "../models/Resturant.model";
import { Request, Response } from "express";

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
