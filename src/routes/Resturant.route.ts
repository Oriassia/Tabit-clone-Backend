import { Router } from "express";
import { getAllRestaurants, getRestaurantById, addReservation, } from "../controllers/Resturant.controller";

export const restaurantsRoute = Router();

// Public routes
restaurantsRoute.get("/", getAllRestaurants);
restaurantsRoute.get("/:id", getRestaurantById);

// Post
restaurantsRoute.post("/:restaurantId/reservations", addReservation);


