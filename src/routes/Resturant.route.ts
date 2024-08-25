import { Router } from "express";
import {
  getAllRestaurants,
  getRestaurantById,
} from "../controllers/Resturant.controller";

export const restaurantsRoute = Router();

// Public routes
restaurantsRoute.get("/", getAllRestaurants);
restaurantsRoute.get("/:id", getRestaurantById);
