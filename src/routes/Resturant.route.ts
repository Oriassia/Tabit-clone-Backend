import { Router } from "express";
import {
  getAllRestaurants,
  getAvailableTables,
  getRestaurantById,
} from "../controllers/Restaurant.controller";

export const restaurantsRoute = Router();

// Public routes
restaurantsRoute.post("/", getAvailableTables);
restaurantsRoute.get("/", getAllRestaurants);

// Get a restaurant by ID
restaurantsRoute.get("/:id", getRestaurantById);
